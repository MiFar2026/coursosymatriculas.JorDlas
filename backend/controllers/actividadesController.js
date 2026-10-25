
const db = require('../config/database')

// Comprueba que el grupo pertenece a la escuela del profesor
// y que el profesor tiene asignado ese grupo.
async function comprobarGrupoProfesor(profesorId, escuelaId, grupoId) {
  const [grupos] = await db.query(
    `SELECT id
     FROM grupos
     WHERE id = ?
       AND profesor_id = ?
       AND escuela_id = ?
       AND activo = 1
     LIMIT 1`,
    [grupoId, profesorId, escuelaId]
  )

  return grupos.length > 0
}

// Listar las actividades de los grupos asignados al profesor.
async function listarMisActividades(req, res) {
  try {
    const profesorId = req.profesor.id
    const escuelaId = req.profesor.escuelaId

    const [actividades] = await db.query(
      `SELECT
         a.id,
         a.titulo,
         a.descripcion,
         a.fecha_entrega,
         a.publicado,
         a.fecha_publicacion,
         a.grupo_id,
         g.nombre AS grupo,
         c.nombre AS curso,
         c.idioma,
         c.nivel
       FROM actividades a
       INNER JOIN grupos g ON g.id = a.grupo_id
       INNER JOIN cursos c ON c.id = g.curso_id
       WHERE a.profesor_id = ?
         AND a.escuela_id = ?
         AND g.profesor_id = ?
         AND g.escuela_id = ?
       ORDER BY a.fecha_publicacion DESC, a.id DESC`,
      [profesorId, escuelaId, profesorId, escuelaId]
    )

    return res.status(200).json({
      ok: true,
      mensaje: 'Actividades consultadas correctamente.',
      datos: actividades
    })
  } catch (error) {
    console.error('Error al listar actividades:', error.message)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar las actividades.'
    })
  }
}

// Publicar una actividad en un grupo asignado.
async function publicarActividad(req, res) {
  try {
    const profesorId = req.profesor.id
    const escuelaId = req.profesor.escuelaId

    const titulo = typeof req.body.titulo === 'string'
      ? req.body.titulo.trim()
      : ''

    const descripcion = typeof req.body.descripcion === 'string'
      ? req.body.descripcion.trim()
      : ''

    const grupoId = Number(req.body.grupo_id)

    if (!titulo || titulo.length > 200) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El título es obligatorio y no puede superar los 200 caracteres.'
      })
    }

    if (descripcion.length > 10000) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La descripción es demasiado larga.'
      })
    }

    if (!Number.isSafeInteger(grupoId) || grupoId <= 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Debes seleccionar un grupo válido.'
      })
    }

    let fechaEntrega = null

    if (
      req.body.fecha_entrega !== undefined &&
      req.body.fecha_entrega !== null &&
      req.body.fecha_entrega !== ''
    ) {
      const fechaTexto = req.body.fecha_entrega

      if (
        typeof fechaTexto !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(fechaTexto)
      ) {
        return res.status(400).json({
          ok: false,
          mensaje: 'La fecha de entrega no tiene un formato válido.'
        })
      }

      const fecha = new Date(fechaTexto)

      if (Number.isNaN(fecha.getTime())) {
        return res.status(400).json({
          ok: false,
          mensaje: 'La fecha de entrega no es válida.'
        })
      }

      // MySQL DATETIME: guardar la fecha local recibida,
      // sin convertirla a una hora UTC diferente.
      fechaEntrega = fechaTexto.replace('T', ' ').slice(0, 19)
    }

    const grupoValido = await comprobarGrupoProfesor(
      profesorId,
      escuelaId,
      grupoId
    )

    if (!grupoValido) {
      return res.status(403).json({
        ok: false,
        mensaje: 'No tienes permiso para publicar actividades en este grupo.'
      })
    }

    const [resultado] = await db.query(
      `INSERT INTO actividades
         (escuela_id, grupo_id, profesor_id, titulo, descripcion, fecha_entrega)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        escuelaId,
        grupoId,
        profesorId,
        titulo,
        descripcion || null,
        fechaEntrega
      ]
    )

    return res.status(201).json({
      ok: true,
      mensaje: 'Actividad publicada correctamente.',
      datos: {
        id: resultado.insertId,
        escuela_id: escuelaId,
        grupo_id: grupoId,
        profesor_id: profesorId,
        titulo,
        descripcion: descripcion || null,
        fecha_entrega: fechaEntrega,
        publicado: 1
      }
    })
  } catch (error) {
    console.error('Error al publicar actividad:', error.message)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo publicar la actividad.'
    })
  }
}

// Retirar una actividad sin borrar su historial.
async function retirarActividad(req, res) {
  try {
    const profesorId = req.profesor.id
    const escuelaId = req.profesor.escuelaId
    const actividadId = Number(req.params.id)

    if (!Number.isSafeInteger(actividadId) || actividadId <= 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El identificador de la actividad no es válido.'
      })
    }

    const [resultado] = await db.query(
      `UPDATE actividades a
       INNER JOIN grupos g ON g.id = a.grupo_id
       SET a.publicado = 0
       WHERE a.id = ?
         AND a.profesor_id = ?
         AND a.escuela_id = ?
         AND g.profesor_id = ?
         AND g.escuela_id = ?`,
      [
        actividadId,
        profesorId,
        escuelaId,
        profesorId,
        escuelaId
      ]
    )

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No se encontró la actividad o no tienes permiso para retirarla.'
      })
    }

    return res.status(200).json({
      ok: true,
      mensaje: 'Actividad retirada de la publicación.'
    })
  } catch (error) {
    console.error('Error al retirar actividad:', error.message)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo retirar la actividad.'
    })
  }
}

module.exports = {
  listarMisActividades,
  publicarActividad,
  retirarActividad
}
