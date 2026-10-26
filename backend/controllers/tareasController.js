
const pool = require('../config/database')
const fs = require('fs/promises')

// Devuelve el grupo activo, su profesor y su escuela
// para el alumno autenticado.
async function obtenerGrupoActivo(alumnoId) {
  const [grupos] = await pool.execute(
    `SELECT
       g.id AS grupo_id,
       g.profesor_id,
       g.escuela_id
     FROM matriculas m
     INNER JOIN grupos g ON g.id = m.grupo_id
     INNER JOIN escuelas e ON e.id = g.escuela_id
     WHERE m.alumno_id = ?
       AND m.estado = 'ACTIVA'
       AND g.activo = 1
       AND e.activa = 1
     ORDER BY m.fecha_matricula DESC, m.id DESC
     LIMIT 1`,
    [alumnoId]
  )

  return grupos.length ? grupos[0] : null
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
          console.error(
            'No se pudo eliminar un archivo temporal:',
            error
          )
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
        mensaje:
          'El título es obligatorio y no puede superar los 200 caracteres.'
      })
    }

    if (comentario.length > 2000) {
      await eliminarArchivos(archivos)

      return res.status(400).json({
        ok: false,
        mensaje:
          'El comentario no puede superar los 2000 caracteres.'
      })
    }

    if (archivos.length === 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Selecciona al menos un archivo.'
      })
    }

    // Obtener el grupo activo y su profesor asignado.
    const grupo = await obtenerGrupoActivo(req.alumnoId)

    if (!grupo) {
      await eliminarArchivos(archivos)

      return res.status(400).json({
        ok: false,
        mensaje:
          'No tienes un grupo activo en una escuela activa para entregar trabajos.'
      })
    }

    // No aceptar entregas sin un profesor responsable.
    if (!grupo.profesor_id) {
      await eliminarArchivos(archivos)

      return res.status(409).json({
        ok: false,
        mensaje:
          'Tu grupo todavía no tiene un profesor asignado. Contacta con la escuela.'
      })
    }

    const grupoId = grupo.grupo_id
    const profesorId = grupo.profesor_id

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
         VALUES (?, ?, ?, ?, ?, ?, ?, 'ENVIADA')`,
        [
          req.alumnoId,
          grupoId,
          profesorId,
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

const path = require('path')

// Listar las entregas de los grupos asignados al profesor.
async function obtenerTareasProfesor(req, res) {
  try {
    const [tareas] = await pool.execute(
      `SELECT
         t.id,
         t.alumno_id,
         t.grupo_id,
         t.titulo,
         t.comentario,
         t.nombre_archivo,
         t.fecha_envio,
         t.estado,
         t.comentario_profesor,
         t.nombre_archivo_corregido,
         t.fecha_revision,
         g.nombre AS nombre_grupo
       FROM tareas t
       INNER JOIN grupos g ON g.id = t.grupo_id
       INNER JOIN escuelas e ON e.id = g.escuela_id
       WHERE t.profesor_id = ?
         AND g.profesor_id = ?
         AND g.escuela_id = ?
         AND g.activo = 1
         AND e.activa = 1
       ORDER BY t.fecha_envio DESC, t.id DESC`,
      [
        req.profesor.id,
        req.profesor.id,
        req.profesor.escuelaId
      ]
    )

    return res.json({
      ok: true,
      datos: tareas
    })
  } catch (error) {
    console.error('Error al consultar las tareas del profesor:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar las entregas.'
    })
  }
}

// Descargar una entrega solo si pertenece a un grupo del profesor.
async function descargarTareaProfesor(req, res) {
  try {
    const tareaId = Number(req.params.id)

    if (!Number.isSafeInteger(tareaId) || tareaId <= 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El identificador de la tarea no es válido.'
      })
    }

    const [filas] = await pool.execute(
      `SELECT
         t.nombre_archivo,
         t.ruta_archivo
       FROM tareas t
       INNER JOIN grupos g ON g.id = t.grupo_id
       INNER JOIN escuelas e ON e.id = g.escuela_id
       WHERE t.id = ?
         AND t.profesor_id = ?
         AND g.profesor_id = ?
         AND g.escuela_id = ?
         AND g.activo = 1
         AND e.activa = 1
       LIMIT 1`,
      [
        tareaId,
        req.profesor.id,
        req.profesor.id,
        req.profesor.escuelaId
      ]
    )

    if (!filas.length) {
      return res.status(404).json({
        ok: false,
        mensaje: 'La tarea no existe o no tienes permiso para acceder a ella.'
      })
    }

    const tarea = filas[0]

    if (!tarea.ruta_archivo) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Esta tarea no tiene un archivo disponible.'
      })
    }

    const carpetaPrivada = path.resolve(
      process.cwd(),
      'private_uploads',
      'tareas'
    )

    const rutaArchivo = path.resolve(
      carpetaPrivada,
      path.basename(tarea.ruta_archivo)
    )

    // Impedir que una ruta almacenada salga de la carpeta privada.
    if (path.dirname(rutaArchivo) !== carpetaPrivada) {
      return res.status(400).json({
        ok: false,
        mensaje: 'La ruta del archivo no es válida.'
      })
    }

    return res.download(
      rutaArchivo,
      path.basename(tarea.nombre_archivo || 'entrega')
    )
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({
        ok: false,
        mensaje: 'El archivo no se encuentra en el servidor.'
      })
    }

    console.error('Error al descargar una tarea:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo descargar el archivo.'
    })
  }
}


module.exports = {
  obtenerGrupoActivo,
  obtenerMisEntregas,
  crearEntrega,
  obtenerTareasProfesor,
  descargarTareaProfesor
}

