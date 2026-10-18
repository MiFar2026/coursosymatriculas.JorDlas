
const pool = require('../config/database')
const fs = require('fs/promises')

// Devuelve el grupo activo del alumno autenticado.
async function obtenerGrupoActivo(alumnoId) {
  const [matriculas] = await pool.execute(
    `SELECT m.grupo_id
     FROM matriculas m
     INNER JOIN grupos g ON g.id = m.grupo_id
     WHERE m.alumno_id = ?
       AND m.estado = 'ACTIVA'
       AND g.activo = 1
     ORDER BY m.fecha_matricula DESC, m.id DESC
     LIMIT 1`,
    [alumnoId]
  )

  return matriculas.length ? matriculas[0].grupo_id : null
}

// Consultar las entregas del alumno autenticado.
async function obtenerMisEntregas(req, res) {
  try {
    const [entregas] = await pool.execute(
      `SELECT
         id,
         titulo,
         comentario,
         nombre_archivo,
         nombre_archivo_corregido,
         comentario_profesor,
         fecha_envio,
         fecha_revision,
         estado
       FROM tareas
       WHERE alumno_id = ?
       ORDER BY fecha_envio DESC, id DESC`,
      [req.alumnoId]
    )

    return res.json({
      ok: true,
      datos: entregas
    })
  } catch (error) {
    console.error('Error al consultar las entregas:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar tus entregas.'
    })
  }
}

// Eliminar archivos si la operación no llega a guardarse.
async function eliminarArchivos(files) {
  await Promise.all(
    (files || []).map(async (archivo) => {
      try {
        await fs.unlink(archivo.path)
      } catch (error) {
        if (error.code !== 'ENOENT') {
          console.error('No se pudo eliminar un archivo temporal:', error)
        }
      }
    })
  )
}

// Crear una entrega con uno o varios archivos.
async function crearEntrega(req, res) {
  const archivos = req.files || []

  try {
    const titulo = typeof req.body.titulo === 'string'
      ? req.body.titulo.trim()
      : ''

    const comentario = typeof req.body.comentario === 'string'
      ? req.body.comentario.trim()
      : ''

    if (!titulo || titulo.length > 200) {
      await eliminarArchivos(archivos)

      return res.status(400).json({
        ok: false,
        mensaje: 'El título es obligatorio y no puede superar los 200 caracteres.'
      })
    }

    if (comentario.length > 2000) {
      await eliminarArchivos(archivos)

      return res.status(400).json({
        ok: false,
        mensaje: 'El comentario no puede superar los 2000 caracteres.'
      })
    }

    if (archivos.length === 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Selecciona al menos un archivo.'
      })
    }

    const grupoId = await obtenerGrupoActivo(req.alumnoId)

    if (!grupoId) {
      await eliminarArchivos(archivos)

      return res.status(400).json({
        ok: false,
        mensaje: 'No tienes un grupo activo para entregar trabajos.'
      })
    }

    const entregasGuardadas = []

    for (const archivo of archivos) {
      const [resultado] = await pool.execute(
        `INSERT INTO tareas (
           alumno_id,
           grupo_id,
           profesor_id,
           titulo,
           comentario,
           nombre_archivo,
           ruta_archivo,
           estado
         )
         VALUES (?, ?, NULL, ?, ?, ?, ?, 'ENVIADA')`,
        [
          req.alumnoId,
          grupoId,
          titulo,
          comentario || null,
          archivo.originalname,
          archivo.filename
        ]
      )

      entregasGuardadas.push({
        id: resultado.insertId,
        titulo,
        nombre_archivo: archivo.originalname,
        estado: 'ENVIADA'
      })
    }

    return res.status(201).json({
      ok: true,
      mensaje: 'La entrega se ha enviado correctamente.',
      datos: entregasGuardadas
    })
  } catch (error) {
    console.error('Error al crear la entrega:', error)

    await eliminarArchivos(archivos)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo guardar la entrega. Inténtalo de nuevo.'
    })
  }
}

module.exports = {
  obtenerGrupoActivo,
  obtenerMisEntregas,
  crearEntrega
}