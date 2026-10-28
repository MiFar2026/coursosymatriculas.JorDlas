
const pool = require('../config/database')

// Devuelve exclusivamente los grupos activos asignados al profesor
// dentro de su propia escuela.
async function getMisGrupos(req, res) {
  try {
    const profesorId = req.profesor.id
    const escuelaId = req.profesor.escuelaId

    const [grupos] = await pool.execute(
      `SELECT
         g.id AS grupo_id,
         g.nombre AS nombre_grupo,
         g.curso_id,
         g.turno,
         g.aula,
         g.escuela_id,
         e.nombre AS nombre_escuela,
         c.nombre AS nombre_curso,
         c.idioma,
         c.nivel,
         COUNT(DISTINCT m.alumno_id) AS total_alumnos
       FROM grupos g
       INNER JOIN escuelas e
         ON e.id = g.escuela_id
       INNER JOIN cursos c
         ON c.id = g.curso_id
       LEFT JOIN matriculas m
         ON m.grupo_id = g.id
         AND m.estado = 'ACTIVA'
       WHERE g.activo = 1
         AND e.activa = 1
         AND c.activo = 1
         AND g.profesor_id = ?
         AND g.escuela_id = ?
       GROUP BY
         g.id,
         g.nombre,
         g.curso_id,
         g.turno,
         g.aula,
         g.escuela_id,
         e.nombre,
         c.nombre,
         c.idioma,
         c.nivel
       ORDER BY c.nombre, c.nivel, g.turno`,
      [profesorId, escuelaId]
    )

    return res.json({
      ok: true,
      datos: grupos
    })
  } catch (error) {
    console.error('Error al consultar grupos del profesor:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar tus grupos.'
    })
  }
}

// Devuelve el alumnado con matrícula activa de un grupo
// que pertenece al profesor autenticado y a su escuela.
async function getAlumnosGrupo(req, res) {
  const grupoId = Number(req.params.grupoId)

  if (!Number.isSafeInteger(grupoId) || grupoId < 1) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El grupo seleccionado no es válido.'
    })
  }

  try {
    const [grupos] = await pool.execute(
      `SELECT id, nombre, escuela_id
       FROM grupos
       WHERE id = ?
         AND profesor_id = ?
         AND escuela_id = ?
         AND activo = 1
       LIMIT 1`,
      [
        grupoId,
        req.profesor.id,
        req.profesor.escuelaId
      ]
    )

    if (grupos.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El grupo no existe o no está asignado a tu cuenta.'
      })
    }

    const [alumnos] = await pool.execute(
      `SELECT
         a.id AS alumno_id,
         a.nombre,
         a.apellidos,
         a.email,
         m.fecha_matricula
       FROM matriculas m
       INNER JOIN alumnos a
         ON a.id = m.alumno_id
       WHERE m.grupo_id = ?
         AND m.estado = 'ACTIVA'
         AND a.activo = 1
       ORDER BY a.apellidos, a.nombre`,
      [grupoId]
    )

    return res.json({
      ok: true,
      grupo: grupos[0],
      datos: alumnos
    })
  } catch (error) {
    console.error('Error al consultar alumnado del grupo:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo consultar el alumnado del grupo.'
    })
  }
}

// Comprueba que el grupo pertenece al profesor autenticado.
async function comprobarGrupoProfesor(conn, grupoId, profesor) {
  const [grupos] = await conn.execute(
    `SELECT id, nombre, escuela_id
     FROM grupos
     WHERE id = ?
       AND profesor_id = ?
       AND escuela_id = ?
       AND activo = 1
     LIMIT 1`,
    [grupoId, profesor.id, profesor.escuelaId]
  )

  return grupos[0] || null
}

// Valida el formato de fecha YYYY-MM-DD.
function fechaValida(fecha) {
  if (typeof fecha !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return false
  }

  const fechaObjeto = new Date(`${fecha}T00:00:00Z`)

  return !Number.isNaN(fechaObjeto.getTime()) &&
    fechaObjeto.toISOString().slice(0, 10) === fecha
}

// Valida las horas HH:MM.
function horaValida(hora) {
  return typeof hora === 'string' &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(hora)
}

// Consulta los alumnos activos y la asistencia de una fecha.
// Si todavía no existe una sesión, devuelve el alumnado
// con estado AUSENTE provisional, sin guardar registros.
async function getAsistenciaFecha(req, res) {
  const grupoId = Number(req.params.grupoId)
  const fecha = req.params.fecha

  if (
    !Number.isSafeInteger(grupoId) ||
    grupoId <= 0 ||
    !fechaValida(fecha)
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El grupo o la fecha no son válidos.'
    })
  }

  try {
    const grupo = await comprobarGrupoProfesor(
      pool,
      grupoId,
      req.profesor
    )

    if (!grupo) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El grupo no existe o no está asignado a tu cuenta.'
      })
    }

    const [sesiones] = await pool.execute(
      `SELECT id, fecha, hora_inicio, hora_fin, estado
       FROM asistencia_sesiones
       WHERE grupo_id = ?
         AND fecha = ?
         AND horario_id IS NULL
       ORDER BY id DESC
       LIMIT 1`,
      [grupoId, fecha]
    )

    const sesion = sesiones[0] || null
    let alumnos = []

    if (sesion) {
      const [registros] = await pool.execute(
        `SELECT
           a.id AS alumno_id,
           a.nombre,
           a.apellidos,
           m.fecha_matricula,
           ar.estado AS estado_asistencia,
           ar.minutos_asistidos
         FROM matriculas m
         INNER JOIN alumnos a
           ON a.id = m.alumno_id
         LEFT JOIN asistencia_registros ar
           ON ar.alumno_id = a.id
           AND ar.sesion_id = ?
         WHERE m.grupo_id = ?
           AND m.estado = 'ACTIVA'
           AND a.activo = 1
         ORDER BY a.apellidos, a.nombre`,
        [sesion.id, grupoId]
      )

      alumnos = registros
    } else {
      const [registros] = await pool.execute(
        `SELECT
           a.id AS alumno_id,
           a.nombre,
           a.apellidos,
           m.fecha_matricula,
           NULL AS estado_asistencia,
           0 AS minutos_asistidos
         FROM matriculas m
         INNER JOIN alumnos a
           ON a.id = m.alumno_id
         WHERE m.grupo_id = ?
           AND m.estado = 'ACTIVA'
           AND a.activo = 1
         ORDER BY a.apellidos, a.nombre`,
        [grupoId]
      )

      alumnos = registros
    }

    return res.json({
      ok: true,
      grupo,
      sesion,
      datos: alumnos
    })
  } catch (error) {
    console.error('Error al consultar la asistencia:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo consultar la asistencia.'
    })
  }
}

// Guarda o actualiza la sesión de una fecha y sus asistencias.
// Solo admite alumnos con matrícula activa en el grupo.
async function guardarAsistenciaFecha(req, res) {
  const grupoId = Number(req.params.grupoId)
  const fecha = req.params.fecha
  const { hora_inicio, hora_fin, registros } = req.body

  if (
    !Number.isSafeInteger(grupoId) ||
    grupoId <= 0 ||
    !fechaValida(fecha)
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El grupo o la fecha no son válidos.'
    })
  }

  if (!horaValida(hora_inicio) || !horaValida(hora_fin)) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Indica una hora de inicio y una hora de finalización válidas.'
    })
  }

  const minutosDesdeMedianoche = hora => {
    const [horas, minutos] = hora.split(':').map(Number)
    return horas * 60 + minutos
  }

  const duracion = (
    minutosDesdeMedianoche(hora_fin) -
    minutosDesdeMedianoche(hora_inicio)
  )

  if (duracion <= 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'La hora de finalización debe ser posterior a la de inicio.'
    })
  }

  if (!Array.isArray(registros) || registros.length === 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'No hay registros de alumnado para guardar.'
    })
  }

  const ids = registros.map(registro => Number(registro.alumno_id))

  if (
    ids.some(id => !Number.isSafeInteger(id) || id <= 0) ||
    new Set(ids).size !== ids.length
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'La lista de alumnos contiene identificadores inválidos o repetidos.'
    })
  }

  for (const registro of registros) {
    const estado = registro.estado
    const minutos = Number(registro.minutos_asistidos)

    if (!['PRESENTE', 'AUSENTE', 'PARCIAL'].includes(estado)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Hay un estado de asistencia no válido.'
      })
    }

    if (!Number.isSafeInteger(minutos) || minutos < 0 || minutos > duracion) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Los minutos de asistencia no son válidos.'
      })
    }

    if (
      (estado === 'AUSENTE' && minutos !== 0) ||
      (estado === 'PRESENTE' && minutos !== duracion) ||
      (estado === 'PARCIAL' && (minutos <= 0 || minutos >= duracion))
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Los minutos deben corresponder al estado de asistencia.'
      })
    }
  }

  const conn = await pool.getConnection()

  try {
    await conn.beginTransaction()

    const grupo = await comprobarGrupoProfesor(
      conn,
      grupoId,
      req.profesor
    )

    if (!grupo) {
      await conn.rollback()

      return res.status(404).json({
        ok: false,
        mensaje: 'El grupo no existe o no está asignado a tu cuenta.'
      })
    }

    const [matriculados] = await conn.execute(
      `SELECT a.id AS alumno_id
       FROM matriculas m
       INNER JOIN alumnos a ON a.id = m.alumno_id
       WHERE m.grupo_id = ?
         AND m.estado = 'ACTIVA'
         AND a.activo = 1`,
      [grupoId]
    )

    const idsPermitidos = new Set(
      matriculados.map(alumno => Number(alumno.alumno_id))
    )

    if (ids.some(id => !idsPermitidos.has(id))) {
      await conn.rollback()

      return res.status(400).json({
        ok: false,
        mensaje: 'La lista contiene alumnos que no tienen matrícula activa en este grupo.'
      })
    }

    // Solo se permite una sesión manual por grupo y fecha.
    const [sesiones] = await conn.execute(
      `SELECT id
       FROM asistencia_sesiones
       WHERE grupo_id = ?
         AND fecha = ?
         AND horario_id IS NULL
       LIMIT 1
       FOR UPDATE`,
      [grupoId, fecha]
    )

    let sesionId

    if (sesiones.length > 0) {
      sesionId = sesiones[0].id

      await conn.execute(
        `UPDATE asistencia_sesiones
         SET hora_inicio = ?,
             hora_fin = ?,
             estado = 'REALIZADA',
             actualizado_por = ?
         WHERE id = ?`,
        [
          `${hora_inicio}:00`,
          `${hora_fin}:00`,
          req.profesor.id,
          sesionId
        ]
      )
    } else {
      const [resultadoSesion] = await conn.execute(
        `INSERT INTO asistencia_sesiones (
           grupo_id,
           horario_id,
           fecha,
           hora_inicio,
           hora_fin,
           estado,
           creado_por,
           actualizado_por
         )
         VALUES (?, NULL, ?, ?, ?, 'REALIZADA', ?, ?)`,
        [
          grupoId,
          fecha,
          `${hora_inicio}:00`,
          `${hora_fin}:00`,
          req.profesor.id,
          req.profesor.id
        ]
      )

      sesionId = resultadoSesion.insertId
    }

    for (const registro of registros) {
      const alumnoId = Number(registro.alumno_id)
      const estadoNuevo = registro.estado
      const minutosNuevos = Number(registro.minutos_asistidos)

      const [anteriores] = await conn.execute(
        `SELECT id, estado, minutos_asistidos
         FROM asistencia_registros
         WHERE sesion_id = ? AND alumno_id = ?
         LIMIT 1`,
        [sesionId, alumnoId]
      )

      if (anteriores.length === 0) {
        const [resultadoRegistro] = await conn.execute(
          `INSERT INTO asistencia_registros (
             sesion_id,
             alumno_id,
             estado,
             minutos_asistidos,
             registrado_por,
             actualizado_por
           )
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            sesionId,
            alumnoId,
            estadoNuevo,
            minutosNuevos,
            req.profesor.id,
            req.profesor.id
          ]
        )

        await conn.execute(
          `INSERT INTO asistencia_historial (
             asistencia_id,
             estado_anterior,
             estado_nuevo,
             minutos_anteriores,
             minutos_nuevos,
             profesor_id
           )
           VALUES (?, NULL, ?, NULL, ?, ?)`,
          [
            resultadoRegistro.insertId,
            estadoNuevo,
            minutosNuevos,
            req.profesor.id
          ]
        )
      } else {
        const anterior = anteriores[0]
        const minutosAnteriores = Number(anterior.minutos_asistidos)

        if (
          anterior.estado !== estadoNuevo ||
          minutosAnteriores !== minutosNuevos
        ) {
          await conn.execute(
            `UPDATE asistencia_registros
             SET estado = ?,
                 minutos_asistidos = ?,
                 actualizado_por = ?
             WHERE id = ?`,
            [
              estadoNuevo,
              minutosNuevos,
              req.profesor.id,
              anterior.id
            ]
          )

          await conn.execute(
            `INSERT INTO asistencia_historial (
               asistencia_id,
               estado_anterior,
               estado_nuevo,
               minutos_anteriores,
               minutos_nuevos,
               profesor_id
             )
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
              anterior.id,
              anterior.estado,
              estadoNuevo,
              minutosAnteriores,
              minutosNuevos,
              req.profesor.id
            ]
          )
        }
      }
    }

    await conn.commit()

    return res.json({
      ok: true,
      mensaje: 'La asistencia se ha guardado correctamente.',
      sesionId
    })
  } catch (error) {
    await conn.rollback()

    console.error('Error al guardar la asistencia:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo guardar la asistencia.'
    })
  } finally {
    conn.release()
  }
}

module.exports = {
  getMisGrupos,
  getAlumnosGrupo,
  getAsistenciaFecha,
  guardarAsistenciaFecha
}