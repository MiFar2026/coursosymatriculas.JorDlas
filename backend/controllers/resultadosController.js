
const pool = require('../config/database')
const fs = require('fs/promises')
const path = require('path')

const TIPOS = [
  'EXAMEN',
  'TAREA',
  'ACTIVIDAD',
  'PARTICIPACION',
  'FINAL'
]

async function eliminarArchivo(file) {
  if (!file?.path) return

  try {
    await fs.unlink(file.path)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('No se pudo eliminar el archivo:', error)
    }
  }
}

// Grupos que pertenecen al profesor autenticado.
async function obtenerGruposProfesor(req, res) {
  try {
    const [grupos] = await pool.execute(
      `SELECT g.id, g.nombre, c.nombre AS curso
       FROM grupos g
       INNER JOIN cursos c ON c.id = g.curso_id
       INNER JOIN escuelas e ON e.id = g.escuela_id
       WHERE g.profesor_id = ?
         AND g.escuela_id = ?
         AND g.activo = 1
         AND e.activa = 1
       ORDER BY g.nombre`,
      [req.profesor.id, req.profesor.escuelaId]
    )

    return res.json({ ok: true, datos: grupos })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar los grupos.'
    })
  }
}

// Alumnos matriculados activamente en un grupo autorizado.
async function obtenerAlumnosGrupo(req, res) {
  try {
    const grupoId = Number(req.params.grupoId)

    if (!Number.isSafeInteger(grupoId) || grupoId <= 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El grupo no es válido.'
      })
    }

    const [grupos] = await pool.execute(
      `SELECT g.id
       FROM grupos g
       INNER JOIN escuelas e ON e.id = g.escuela_id
       WHERE g.id = ?
         AND g.profesor_id = ?
         AND g.escuela_id = ?
         AND g.activo = 1
         AND e.activa = 1`,
      [grupoId, req.profesor.id, req.profesor.escuelaId]
    )

    if (!grupos.length) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El grupo no existe o no tienes permiso.'
      })
    }

    const [alumnos] = await pool.execute(
      `SELECT a.id, a.nombre, a.apellidos
       FROM matriculas m
       INNER JOIN alumnos a ON a.id = m.alumno_id
       WHERE m.grupo_id = ?
         AND m.estado = 'ACTIVA'
         AND a.activo = 1
       ORDER BY a.apellidos, a.nombre`,
      [grupoId]
    )

    return res.json({ ok: true, datos: alumnos })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar los alumnos.'
    })
  }
}

// Registrar una nota y, opcionalmente, un archivo corregido.

async function guardarResultado(req, res) {
  const archivo = req.file

  try {
    const grupoId = Number(req.body.grupo_id)
    const alumnoId = Number(req.body.alumno_id)
    const tipo = req.body.tipo
    const titulo = typeof req.body.titulo === 'string'
      ? req.body.titulo.trim()
      : ''
    const comentario = typeof req.body.comentario === 'string'
      ? req.body.comentario.trim()
      : ''
    const notaTexto = req.body.nota

    if (
      !Number.isSafeInteger(grupoId) || grupoId <= 0 ||
      !Number.isSafeInteger(alumnoId) || alumnoId <= 0
    ) {
      await eliminarArchivo(archivo)
      return res.status(400).json({
        ok: false,
        mensaje: 'Selecciona un grupo y un alumno válidos.'
      })
    }

    if (!TIPOS.includes(tipo)) {
      await eliminarArchivo(archivo)
      return res.status(400).json({
        ok: false,
        mensaje: 'El tipo de evaluación no es válido.'
      })
    }

    if (!titulo || titulo.length > 200) {
      await eliminarArchivo(archivo)
      return res.status(400).json({
        ok: false,
        mensaje: 'El título es obligatorio y admite 200 caracteres como máximo.'
      })
    }

    if (
      notaTexto === undefined ||
      String(notaTexto).trim() === '' ||
      !Number.isFinite(Number(notaTexto)) ||
      Number(notaTexto) < 0 ||
      Number(notaTexto) > 10
    ) {
      await eliminarArchivo(archivo)
      return res.status(400).json({
        ok: false,
        mensaje: 'La nota es obligatoria y debe estar entre 0 y 10.'
      })
    }

    const nota = Number(notaTexto)

    if (comentario.length > 2000) {
      await eliminarArchivo(archivo)
      return res.status(400).json({
        ok: false,
        mensaje: 'El comentario admite 2000 caracteres como máximo.'
      })
    }

    // La aptitud solo corresponde al resultado FINAL.
    // Menos de 5: NO_APTO automático.
    // De 5 a menos de 6: decisión de la profesora.
    // Desde 6: APTO automático.
    let decisionApto = null

    if (tipo === 'FINAL') {
      if (nota < 5) {
        decisionApto = 'NO_APTO'
      } else if (nota >= 6) {
        decisionApto = 'APTO'
      } else {
        const decisionSolicitada = req.body.decision_apto

        if (!['APTO', 'NO_APTO'].includes(decisionSolicitada)) {
          await eliminarArchivo(archivo)
          return res.status(400).json({
            ok: false,
            mensaje:
              'Para una nota final entre 5 y menos de 6, la profesora debe seleccionar APTO o NO APTO.'
          })
        }

        decisionApto = decisionSolicitada
      }
    } else if (
      req.body.decision_apto !== undefined &&
      req.body.decision_apto !== ''
    ) {
      await eliminarArchivo(archivo)
      return res.status(400).json({
        ok: false,
        mensaje: 'La decisión de aptitud solo corresponde al examen final.'
      })
    }

    // Comprobar que el profesor tiene asignado el grupo
    // y que el alumno pertenece activamente a ese grupo.
    const [autorizados] = await pool.execute(
      `SELECT g.id
       FROM grupos g
       INNER JOIN escuelas e ON e.id = g.escuela_id
       INNER JOIN matriculas m ON m.grupo_id = g.id
       INNER JOIN alumnos a ON a.id = m.alumno_id
       WHERE g.id = ?
         AND a.id = ?
         AND g.profesor_id = ?
         AND g.escuela_id = ?
         AND g.activo = 1
         AND e.activa = 1
         AND a.activo = 1
         AND m.estado = 'ACTIVA'
       LIMIT 1`,
      [
        grupoId,
        alumnoId,
        req.profesor.id,
        req.profesor.escuelaId
      ]
    )

    if (!autorizados.length) {
      await eliminarArchivo(archivo)
      return res.status(403).json({
        ok: false,
        mensaje: 'No tienes permiso para registrar resultados de este alumno.'
      })
    }

    // Guardar la calificación y la decisión de aptitud.
    const [resultado] = await pool.execute(
      `INSERT INTO resultados (
         alumno_id,
         grupo_id,
         profesor_id,
         tipo,
         titulo,
         nota,
         comentario,
         fecha_resultado,
         archivo_corregido,
         nombre_archivo_corregido,
         decision_apto
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE(), ?, ?, ?)`,
      [
        alumnoId,
        grupoId,
        req.profesor.id,
        tipo,
        titulo,
        nota,
        comentario || null,
        archivo?.filename || null,
        archivo?.originalname || null,
        decisionApto
      ]
    )

    // Calcular la media de las actividades y localizar
    // la nota del examen final para este alumno y grupo.
    const [calificaciones] = await pool.execute(
      `SELECT
         AVG(CASE
           WHEN tipo IN ('EXAMEN', 'TAREA', 'ACTIVIDAD', 'PARTICIPACION')
           THEN nota
         END) AS media_actividades,
         MAX(CASE
           WHEN tipo = 'FINAL' THEN nota
         END) AS nota_examen_final,
         COUNT(CASE
           WHEN tipo = 'FINAL' THEN 1
         END) AS cantidad_finales
       FROM resultados
       WHERE alumno_id = ? AND grupo_id = ?`,
      [alumnoId, grupoId]
    )

    const datos = calificaciones[0]

    const mediaActividades = datos.media_actividades === null
      ? null
      : Number(datos.media_actividades)

    const notaExamenFinal = datos.nota_examen_final === null
      ? null
      : Number(datos.nota_examen_final)

    // No hay nota ponderada definitiva hasta que existan
    // al menos una actividad calificada y un examen FINAL.
    const notaPonderada = (
      mediaActividades !== null &&
      notaExamenFinal !== null &&
      Number(datos.cantidad_finales) > 0
    )
      ? Math.round(
          (notaExamenFinal * 0.4 + mediaActividades * 0.6) * 100
        ) / 100
      : null

    return res.status(201).json({
      ok: true,
      mensaje: 'Resultado guardado correctamente.',
      id: resultado.insertId,
      decisionApto,
      mediaActividades,
      notaExamenFinal,
      notaPonderada
    })
  } catch (error) {
    await eliminarArchivo(archivo)
    console.error('Error al guardar el resultado:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo guardar el resultado.'
    })
  }
}


 // Resultados del alumno autenticado.
 // El ID del alumno procede exclusivamente de su sesión validada.
async function obtenerMisResultados(req, res) {
  try {
    if (!Number.isInteger(req.alumnoId) || req.alumnoId < 1) {
      return res.status(401).json({
        ok: false,
        mensaje: 'La sesión del alumno no es válida.'
      })
    }

    const [resultados] = await pool.execute(
      `SELECT
         r.id,
         r.grupo_id,
         r.tipo,
         r.titulo,
         r.nota,
         r.comentario,
         r.fecha_resultado,
         r.decision_apto,
         r.nombre_archivo_corregido,
         g.nombre AS nombre_grupo,
         c.nombre AS nombre_curso
       FROM resultados r
       INNER JOIN grupos g ON g.id = r.grupo_id
       INNER JOIN cursos c ON c.id = g.curso_id
       WHERE r.alumno_id = ?
       ORDER BY r.fecha_resultado DESC, r.id DESC`,
      [req.alumnoId]
    )

    return res.status(200).json({
      ok: true,
      datos: resultados
    })
  } catch (error) {
    console.error('Error al consultar los resultados del alumno:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar tus resultados.'
    })
  }
}

async function descargarArchivo(req, res, modo) {
  try {
    const resultadoId = Number(req.params.id)

    if (!Number.isSafeInteger(resultadoId) || resultadoId <= 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El identificador no es válido.'
      })
    }

    let consulta
    let parametros

    if (modo === 'profesor') {
      consulta = `SELECT r.archivo_corregido, r.nombre_archivo_corregido
        FROM resultados r
        INNER JOIN grupos g ON g.id = r.grupo_id
        INNER JOIN escuelas e ON e.id = g.escuela_id
        WHERE r.id = ?
          AND r.profesor_id = ?
          AND g.profesor_id = ?
          AND g.escuela_id = ?
          AND g.activo = 1
          AND e.activa = 1
        LIMIT 1`

      parametros = [
        resultadoId,
        req.profesor.id,
        req.profesor.id,
        req.profesor.escuelaId
      ]
    } else {
      consulta = `SELECT archivo_corregido, nombre_archivo_corregido
        FROM resultados
        WHERE id = ? AND alumno_id = ?
        LIMIT 1`

      parametros = [resultadoId, req.alumnoId]
    }

    const [filas] = await pool.execute(consulta, parametros)

    if (!filas.length || !filas[0].archivo_corregido) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El archivo no existe o no tienes permiso para descargarlo.'
      })
    }

    const registro = filas[0]
    const carpetaPrivada = path.resolve(
      process.cwd(),
      'private_uploads',
      'resultados'
    )
    const ruta = path.resolve(
      carpetaPrivada,
      path.basename(registro.archivo_corregido)
    )

    if (path.dirname(ruta) !== carpetaPrivada) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La ruta del archivo no es válida.'
      })
    }

    await fs.access(ruta)

    return res.download(
      ruta,
      path.basename(registro.nombre_archivo_corregido || 'archivo-corregido')
    )
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({
        ok: false,
        mensaje: 'El archivo no está disponible en el servidor.'
      })
    }

    console.error('Error al descargar el archivo corregido:', error)
    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo descargar el archivo.'
    })
  }
}

async function descargarArchivoProfesor(req, res) {
  return descargarArchivo(req, res, 'profesor')
}

async function descargarArchivoAlumno(req, res) {
  return descargarArchivo(req, res, 'alumno')
}

// Consulta de notas finales para administración.
// Consulta de notas finales para administración.

async function obtenerNotasFinales(req, res) {
  try {
    const [resultados] = await pool.execute(
      `SELECT
         r.id,
         r.alumno_id,
         a.nombre,
         a.apellidos,
         r.grupo_id,
         g.nombre AS nombre_grupo,
         g.escuela_id,
         e.nombre AS nombre_escuela,
         c.nombre AS nombre_curso,
         r.titulo,
         r.nota,
         r.decision_apto,
         r.estado_certificado,
         r.fecha_resultado
       FROM resultados r
       INNER JOIN alumnos a ON a.id = r.alumno_id
       INNER JOIN grupos g ON g.id = r.grupo_id
       INNER JOIN cursos c ON c.id = g.curso_id
       INNER JOIN escuelas e ON e.id = g.escuela_id
       WHERE r.tipo = 'FINAL'
         AND NOT EXISTS (
           SELECT 1
           FROM resultados r2
           WHERE r2.alumno_id = r.alumno_id
             AND r2.grupo_id = r.grupo_id
             AND r2.tipo = 'FINAL'
             AND (
               r2.nota > r.nota
               OR (
                 r2.nota = r.nota
                 AND r2.id > r.id
               )
             )
         )
       ORDER BY
         e.id,
         a.apellidos,
         a.nombre`,
    )

    return res.json({
      ok: true,
      datos: resultados
    })
  } catch (error) {
    console.error(
      'Error al consultar las notas finales para administración:',
      error
    )

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar las notas finales.'
    })
  }
}



/**
 * Actualiza el estado del certificado desde la administración.
 * Solo permite gestionar certificados de resultados finales APTO.
 */
async function actualizarEstadoCertificado(req, res) {
  try {
    const resultadoId = Number(req.params.id)
    const { estado_certificado } = req.body

    const estadosPermitidos = ['PENDIENTE', 'EMITIDO', 'ENTREGADO']

    if (!Number.isInteger(resultadoId) || resultadoId <= 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El identificador del resultado no es válido.'
      })
    }

    if (!estadosPermitidos.includes(estado_certificado)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El estado del certificado no es válido.'
      })
    }

    // Comprobar que existe un resultado final declarado APTO.
    const [resultados] = await pool.execute(
      `SELECT id, tipo, decision_apto
       FROM resultados
       WHERE id = ?`,
      [resultadoId]
    )

    if (resultados.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No se ha encontrado el resultado.'
      })
    }

    const resultado = resultados[0]

    if (
      resultado.tipo !== 'FINAL' ||
      resultado.decision_apto !== 'APTO'
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Solo se pueden gestionar certificados de resultados finales APTO.'
      })
    }

    await pool.execute(
      `UPDATE resultados
       SET estado_certificado = ?
       WHERE id = ?`,
      [estado_certificado, resultadoId]
    )

    return res.json({
      ok: true,
      mensaje: 'El estado del certificado se ha actualizado correctamente.',
      id: resultadoId,
      estado_certificado
    })
  } catch (error) {
    console.error('Error al actualizar el estado del certificado:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo actualizar el estado del certificado.'
    })
  }
}


module.exports = {
  obtenerGruposProfesor,
  obtenerAlumnosGrupo,
  guardarResultado,
  obtenerMisResultados,
  descargarArchivoProfesor,
  descargarArchivoAlumno,
  obtenerNotasFinales,
  actualizarEstadoCertificado
}
