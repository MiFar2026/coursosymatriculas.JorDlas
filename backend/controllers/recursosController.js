
const db = require('../config/database')


const fs = require('fs/promises')
const path = require('path')
const { enviarAvisoRecurso } = require('../services/correoService')

const ESCUELAS_PERMITIDAS = [
  'Ateneu Aula 502',
  'Biblioteca Joan Miró'
]

// Consultar recursos publicados de una escuela.
async function getRecursos(req, res) {
  const escuela = (req.query.escuela || '').trim()
  const grupoIdTexto = req.query.grupo_id

  if (!ESCUELAS_PERMITIDAS.includes(escuela)) {
    return res.status(400).json({
      ok: false,
      mensaje: 'La escuela indicada no es válida.',
      datos: null
    })
  }

  let grupoId = null

  if (grupoIdTexto !== undefined) {
    grupoId = Number(grupoIdTexto)

    if (!Number.isSafeInteger(grupoId) || grupoId <= 0) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El identificador del grupo no es válido.',
        datos: null
      })
    }
  }

  try {
    let sql = `
      SELECT
        r.id,
                r.profesor_id,
        r.titulo,
        r.descripcion,
        r.nombre_archivo,
        r.ruta_archivo,
        r.url,
        r.tipo,
        r.fecha_publicacion,
        e.nombre AS escuela,
        g.id AS grupo_id,
        g.nombre AS grupo,
        c.nombre AS curso,
        c.idioma,
        c.nivel,
        p.nombre AS profesor_nombre,
        p.apellidos AS profesor_apellidos
      FROM recursos r
      INNER JOIN escuelas e ON e.id = r.escuela_id
      INNER JOIN profesores p ON p.id = r.profesor_id
      LEFT JOIN grupos g ON g.id = r.grupo_id
      LEFT JOIN cursos c ON c.id = g.curso_id
      WHERE e.nombre = ?
        AND e.activa = 1
        AND r.publicado = 1
        AND p.activo = 1
        AND (r.grupo_id IS NULL OR g.activo = 1)
    `

    const parametros = [escuela]

    if (grupoId !== null) {
      sql += ' AND r.grupo_id = ?'
      parametros.push(grupoId)
    }

    sql += ' ORDER BY r.fecha_publicacion DESC, r.id DESC'

    const [recursos] = await db.query(sql, parametros)

    return res.status(200).json({
      ok: true,
      mensaje: recursos.length
        ? 'Recursos encontrados.'
        : 'Todavía no hay recursos publicados.',
      datos: recursos
    })
  } catch (error) {
    console.error('Error al obtener recursos:', error.message)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar los recursos.',
      datos: null
    })
  }
}

// Consultar los grupos asignados al profesor.
async function getMisGruposRecursos(req, res) {
  try {
    const [grupos] = await db.query(
      `SELECT
         g.id,
         g.nombre,
         c.nombre AS curso,
         c.idioma,
         c.nivel
       FROM grupos g
       INNER JOIN cursos c ON c.id = g.curso_id
       WHERE g.profesor_id = ?
         AND g.escuela_id = ?
         AND g.activo = 1
       ORDER BY c.idioma, c.nivel, g.nombre`,
      [req.profesor.id, req.profesor.escuelaId]
    )

    return res.status(200).json({
      ok: true,
      mensaje: 'Grupos consultados correctamente.',
      datos: grupos
    })
  } catch (error) {
    console.error('Error al consultar grupos del profesor:', error.message)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar tus grupos.'
    })
  }
}

// Publicar un recurso que puede ser un enlace o un archivo.
// La subida de archivos se conectará en el siguiente paso.

async function publicarRecurso(req, res) {
  let archivoGuardado = null
  let recursoInsertado = false

  try {
    const profesorId = req.profesor.id
    const escuelaId = req.profesor.escuelaId
    const archivo = req.file || null

    const titulo = typeof req.body.titulo === 'string'
      ? req.body.titulo.trim()
      : ''

    const descripcion = typeof req.body.descripcion === 'string'
      ? req.body.descripcion.trim()
      : ''

    const tipo = typeof req.body.tipo === 'string'
      ? req.body.tipo.trim().toUpperCase()
      : 'OTRO'

    const url = typeof req.body.url === 'string'
      ? req.body.url.trim()
      : ''

    const grupoIdTexto = req.body.grupo_id
    let grupoId = null

    if (
      grupoIdTexto !== undefined &&
      grupoIdTexto !== null &&
      grupoIdTexto !== ''
    ) {
      grupoId = Number(grupoIdTexto)

      if (!Number.isSafeInteger(grupoId) || grupoId <= 0) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El grupo seleccionado no es válido.'
        })
      }
    }

    const tiposPermitidos = [
      'PDF',
      'DOCUMENTO',
      'IMAGEN',
      'AUDIO',
      'VIDEO',
      'OTRO'
    ]

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

    if (!tiposPermitidos.includes(tipo)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El tipo de recurso no es válido.'
      })
    }

    if (!archivo && !url) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Debes seleccionar un archivo o proporcionar una URL.'
      })
    }

    let urlValidada = null

    if (url) {
      try {
        const urlObjeto = new URL(url)

        if (!['https:', 'http:'].includes(urlObjeto.protocol)) {
          throw new Error('Protocolo no permitido')
        }

        urlValidada = urlObjeto.toString()
      } catch {
        return res.status(400).json({
          ok: false,
          mensaje: 'Introduce una URL válida que comience por http:// o https://.'
        })
      }
    }

    if (grupoId !== null) {
      const [grupos] = await db.query(
        `SELECT id, nombre
         FROM grupos
         WHERE id = ?
           AND profesor_id = ?
           AND escuela_id = ?
           AND activo = 1
         LIMIT 1`,
        [grupoId, profesorId, escuelaId]
      )

      if (!grupos.length) {
        return res.status(403).json({
          ok: false,
          mensaje: 'No tienes permiso para publicar recursos en ese grupo.'
        })
      }
    }

    const [escuelas] = await db.query(
      `SELECT nombre
       FROM escuelas
       WHERE id = ?
         AND activa = 1
       LIMIT 1`,
      [escuelaId]
    )

    if (!escuelas.length) {
      return res.status(403).json({
        ok: false,
        mensaje: 'La escuela del profesor no está disponible.'
      })
    }

    const [gruposCorreo] = grupoId !== null
      ? await db.query(
          'SELECT nombre FROM grupos WHERE id = ? AND escuela_id = ? LIMIT 1',
          [grupoId, escuelaId]
        )
      : [[]]

    const nombreOriginal = archivo
      ? archivo.originalname.replace(/[\\/\r\n]/g, '_').slice(0, 255)
      : null

    const rutaPublica = archivo
      ? `/uploads/recursos/${escuelaId === 1 ? 'joanmiro' : 'ateneu'}/${archivo.filename}`
      : null

    archivoGuardado = archivo ? archivo.path : null

    const [resultado] = await db.query(
      `INSERT INTO recursos (
        escuela_id,
        grupo_id,
        profesor_id,
        titulo,
        descripcion,
        nombre_archivo,
        ruta_archivo,
        url,
        tipo,
        publicado
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        escuelaId,
        grupoId,
        profesorId,
        titulo,
        descripcion || null,
        nombreOriginal,
        rutaPublica,
        urlValidada,
        tipo
      ]
    )

    recursoInsertado = true

    let correoEnviado = false

    try {
      await enviarAvisoRecurso({
        titulo,
        descripcion,
        escuela: escuelas[0].nombre,
        grupo: gruposCorreo[0]?.nombre || 'Toda la escuela',
        url: urlValidada || rutaPublica,
        tipo,
        archivoAdjunto: archivo
          ? {
              filename: nombreOriginal,
              path: archivo.path
            }
          : null
      })

      correoEnviado = true
    } catch (errorCorreo) {
      console.error(
        'El recurso se guardó, pero falló el envío del correo:',
        errorCorreo.message
      )
    }

    return res.status(201).json({
      ok: true,
      mensaje: correoEnviado
        ? 'Recurso publicado y copia enviada por correo.'
        : 'Recurso publicado, pero no se pudo enviar la copia por correo.',
      datos: {
        id: resultado.insertId,
        escuela_id: escuelaId,
        grupo_id: grupoId,
        titulo,
        descripcion: descripcion || null,
        nombre_archivo: nombreOriginal,
        ruta_archivo: rutaPublica,
        url: urlValidada,
        tipo,
        publicado: 1,
        correo_enviado: correoEnviado
      }
    })
  } catch (error) {
    console.error('Error al publicar recurso:', error.message)

    if (archivoGuardado && !recursoInsertado) {
      try {
        await fs.unlink(archivoGuardado)
      } catch (errorArchivo) {
        console.error(
          'No se pudo eliminar el archivo tras el error:',
          errorArchivo.message
        )
      }
    }

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo publicar el recurso.'
    })
  }
}

async function actualizarRecurso(req, res) {
  const conexion = require('../config/database')
  const recursoId = Number(req.params.id)
  const profesorId = Number(req.profesor.id)
  const escuelaId = Number(req.profesor.escuelaId)

  const { titulo, descripcion } = req.body

  if (
    !Number.isInteger(recursoId) ||
    recursoId <= 0 ||
    !Number.isInteger(profesorId) ||
    ![1, 2].includes(escuelaId)
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Datos no válidos.'
    })
  }

  if (typeof titulo !== 'string' || !titulo.trim()) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El título es obligatorio.'
    })
  }

  try {
    const [resultado] = await conexion.query(
      `UPDATE recursos
       SET titulo = ?, descripcion = ?
       WHERE id = ?
         AND profesor_id = ?
         AND escuela_id = ?`,
      [
        titulo.trim(),
        typeof descripcion === 'string' ? descripcion.trim() : '',
        recursoId,
        profesorId,
        escuelaId
      ]
    )

    if (resultado.affectedRows === 0) {
      const [filas] = await conexion.query(
        `SELECT id FROM recursos
         WHERE id = ? AND profesor_id = ? AND escuela_id = ?`,
        [recursoId, profesorId, escuelaId]
      )

      if (filas.length === 0) {
        return res.status(404).json({
          ok: false,
          mensaje: 'No se encontró el recurso o no tienes permiso para modificarlo.'
        })
      }
    }

    return res.json({
      ok: true,
      mensaje: 'Recurso actualizado correctamente.'
    })
  } catch (error) {
    console.error('Error al actualizar el recurso:', error)
    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo actualizar el recurso.'
    })
  }
}


async function eliminarRecurso(req, res) {
  const recursoId = Number(req.params.id)
  const profesorId = Number(req.profesor.id)
  const escuelaId = Number(req.profesor.escuelaId)

  if (
    !Number.isSafeInteger(recursoId) ||
    recursoId <= 0 ||
    !Number.isSafeInteger(profesorId) ||
    ![1, 2].includes(escuelaId)
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Datos no válidos.'
    })
  }

  try {
    const [recursos] = await db.query(
      `SELECT id, ruta_archivo
       FROM recursos
       WHERE id = ?
         AND profesor_id = ?
         AND escuela_id = ?
       LIMIT 1`,
      [recursoId, profesorId, escuelaId]
    )

    if (recursos.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No se encontró el recurso o no tienes permiso para eliminarlo.'
      })
    }

    const recurso = recursos[0]

    await db.query(
      `DELETE FROM recursos
       WHERE id = ?
         AND profesor_id = ?
         AND escuela_id = ?`,
      [recursoId, profesorId, escuelaId]
    )

    if (recurso.ruta_archivo) {
      const carpetaRecursos = path.resolve(
        __dirname,
        '..',
        'uploads',
        'recursos'
      )

      const rutaArchivo = path.resolve(
        __dirname,
        '..',
        recurso.ruta_archivo.replace(/^\/+/, '')
      )

      if (rutaArchivo.startsWith(carpetaRecursos + path.sep)) {
        try {
          await fs.unlink(rutaArchivo)
        } catch (errorArchivo) {
          if (errorArchivo.code !== 'ENOENT') {
            console.error(
              'El recurso se eliminó de la base de datos, pero no se pudo borrar el archivo:',
              errorArchivo.message
            )
          }
        }
      }
    }

    return res.json({
      ok: true,
      mensaje: 'Recurso eliminado correctamente.'
    })
  } catch (error) {
    console.error('Error al eliminar el recurso:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo eliminar el recurso.'
    })
  }
}

module.exports = {
  getRecursos,
  getMisGruposRecursos,
  publicarRecurso,
  actualizarRecurso,
  eliminarRecurso
}