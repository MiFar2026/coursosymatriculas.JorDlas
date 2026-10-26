
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

    if (comentario.length > 2000) {
      await eliminarArchivo(archivo)
      return res.status(400).json({
        ok: false,
        mensaje: 'El comentario admite 2000 caracteres como máximo.'
      })
    }

    // Comprobar que el profesor tiene asignado ese grupo
    // y que el alumno pertenece activamente a él.
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
         nombre_archivo_corregido
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE(), ?, ?)`,
      [
        alumnoId,
        grupoId,
        req.profesor.id,
        tipo,
        titulo,
        Number(notaTexto),
        comentario || null,
        archivo?.filename || null,
        archivo?.originalname || null
      ]
    )

    return res.status(201).json({
      ok: true,
      mensaje: 'Resultado guardado correctamente.',
      id: resultado.insertId
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

// Resultados del alumno autenticado: nunca se usa un alumnoId
// enviado por el navegador para decidir qué notas mostrar.
async function obtenerMisResultados(req, res) {
  try {
    const [resultados] = await pool.execute(
      `SELECT
         r.id,
         r.grupo_id,
         r.tipo,
         r.titulo,
         r.nota,
         r.comentario,
         r.fecha_resultado,
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

    return res.json({ ok: true, datos: resultados })
  } catch (error) {
    console.error(error)
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
         r.titulo,
         r.nota,
         r.fecha_resultado
       FROM resultados r
       INNER JOIN alumnos a ON a.id = r.alumno_id
       INNER JOIN grupos g ON g.id = r.grupo_id
       INNER JOIN escuelas e ON e.id = g.escuela_id
       WHERE r.tipo = 'FINAL'
       ORDER BY e.id, a.apellidos, a.nombre`
    )

    return res.json({ ok: true, datos: resultados })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar las notas finales.'
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
  obtenerNotasFinales
}
