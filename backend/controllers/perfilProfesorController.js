const db = require('../config/database')
const fs = require('fs')
const path = require('path')

const CARPETA_FOTOS = path.join(
  __dirname,
  '..',
  'uploads',
  'fotos',
  'tutores'
)

/**
 * Comprueba que el profesor está activo y tiene
 * una asignación activa en la escuela de su sesión.
 */
async function comprobarAutorizacion(profesorId, escuelaId) {
  const [filas] = await db.query(
    `SELECT p.id
     FROM profesores p
     INNER JOIN grupos g
       ON g.profesor_id = p.id
     INNER JOIN escuelas e
       ON e.id = g.escuela_id
     WHERE p.id = ?
       AND p.activo = 1
       AND g.activo = 1
       AND g.escuela_id = ?
       AND e.activa = 1
     LIMIT 1`,
    [profesorId, escuelaId]
  )

  return filas.length > 0
}

/**
 * Obtiene el perfil del profesor y sus asignaciones.
 */
async function getMiPerfilProfesor(req, res) {
  const profesorId = Number(req.profesor?.id)
  const escuelaId = Number(req.profesor?.escuelaId)

  try {
    if (
      !Number.isSafeInteger(profesorId) ||
      profesorId <= 0 ||
      ![1, 2].includes(escuelaId)
    ) {
      return res.status(401).json({
        ok: false,
        mensaje: 'La sesión del profesor no es válida.'
      })
    }

    const autorizado = await comprobarAutorizacion(
      profesorId,
      escuelaId
    )

    if (!autorizado) {
      return res.status(403).json({
        ok: false,
        mensaje:
          'No estás autorizado para acceder a este perfil.'
      })
    }

    const [profesores] = await db.query(
      `SELECT
         id,
         nombre,
         apellidos,
         telefono,
         email,
         especialidad,
         foto
       FROM profesores
       WHERE id = ?
         AND activo = 1
       LIMIT 1`,
      [profesorId]
    )

    if (!profesores.length) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No se ha encontrado el perfil del profesor.'
      })
    }

    const [asignaciones] = await db.query(
      `SELECT
         e.id AS escuelaId,
         e.nombre AS escuela,
         g.id AS grupoId,
         g.nombre AS grupo,
         g.turno,
         g.aula,
         c.id AS cursoId,
         c.nombre AS curso,
         c.idioma,
         c.nivel,
         h.id AS horarioId,
         h.dia_semana AS diaSemana,
         h.hora_inicio AS horaInicio,
         h.hora_fin AS horaFin
       FROM grupos g
       INNER JOIN escuelas e
         ON e.id = g.escuela_id
       INNER JOIN cursos c
         ON c.id = g.curso_id
       LEFT JOIN horarios h
         ON h.grupo_id = g.id
         AND h.activo = 1
       WHERE g.profesor_id = ?
  AND g.escuela_id = ?
  AND g.activo = 1
  AND e.activa = 1
  AND c.activo = 1
       ORDER BY
         e.nombre,
         g.nombre,
         FIELD(
           h.dia_semana,
           'Lunes',
           'Martes',
           'Miércoles',
           'Jueves',
           'Viernes',
           'Sábado',
           'Domingo'
         ),
         h.hora_inicio`,
[profesorId, escuelaId]
    )

    return res.json({
      ok: true,
      datos: {
        ...profesores[0],
        asignaciones
      }
    })
  } catch (error) {
    console.error(
      'Error al cargar el perfil del profesor:',
      error
    )

    return res.status(500).json({
      ok: false,
      mensaje: 'No se ha podido cargar el perfil del profesor.'
    })
  }
}

/**
 * Actualiza los datos personales del profesor.
 *
 * Campos admitidos:
 * nombre, apellidos, telefono, email y especialidad.
 */
async function actualizarDatosProfesor(req, res) {
  const profesorId = Number(req.profesor?.id)
  const escuelaId = Number(req.profesor?.escuelaId)

  const nombre =
    typeof req.body?.nombre === 'string'
      ? req.body.nombre.trim()
      : ''

  const apellidos =
    typeof req.body?.apellidos === 'string'
      ? req.body.apellidos.trim()
      : ''

  const telefono =
    typeof req.body?.telefono === 'string'
      ? req.body.telefono.trim()
      : ''

  const email =
    typeof req.body?.email === 'string'
      ? req.body.email.trim().toLowerCase()
      : ''

  const especialidad =
    typeof req.body?.especialidad === 'string'
      ? req.body.especialidad.trim()
      : ''

  // Validaciones
  if (!nombre || nombre.length > 100) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El nombre es obligatorio y no puede superar los 100 caracteres.'
    })
  }

  if (!apellidos || apellidos.length > 150) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Los apellidos son obligatorios y no pueden superar los 150 caracteres.'
    })
  }

  if (!telefono || telefono.length > 30) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Introduce un teléfono válido de hasta 30 caracteres.'
    })
  }

  if (
    !email ||
    email.length > 150 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Introduce un correo electrónico válido.'
    })
  }

  if (especialidad.length > 150) {
    return res.status(400).json({
      ok: false,
      mensaje: 'La especialidad no puede superar los 150 caracteres.'
    })
  }

  try {
    if (
      !Number.isSafeInteger(profesorId) ||
      profesorId <= 0 ||
      ![1, 2].includes(escuelaId)
    ) {
      return res.status(401).json({
        ok: false,
        mensaje: 'La sesión del profesor no es válida.'
      })
    }

    const autorizado = await comprobarAutorizacion(
      profesorId,
      escuelaId
    )

    if (!autorizado) {
      return res.status(403).json({
        ok: false,
        mensaje:
          'No estás autorizado para modificar este perfil.'
      })
    }

    await db.query(
      `UPDATE profesores
       SET nombre = ?,
           apellidos = ?,
           telefono = ?,
           email = ?,
           especialidad = ?
       WHERE id = ?
         AND activo = 1`,
      [
        nombre,
        apellidos,
        telefono,
        email,
        especialidad,
        profesorId
      ]
    )

    const [filas] = await db.query(
      `SELECT
         id,
         nombre,
         apellidos,
         telefono,
         email,
         especialidad,
         foto
       FROM profesores
       WHERE id = ?
         AND activo = 1
       LIMIT 1`,
      [profesorId]
    )

    if (!filas.length) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No se ha encontrado el perfil actualizado.'
      })
    }

    return res.json({
      ok: true,
      mensaje: 'Los datos del perfil se han actualizado correctamente.',
      datos: filas[0]
    })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        mensaje:
          'Ese correo electrónico ya está asociado a otra cuenta.'
      })
    }

    console.error(
      'Error al actualizar el perfil del profesor:',
      error
    )

    return res.status(500).json({
      ok: false,
      mensaje: 'No se han podido guardar los cambios.'
    })
  }
}

/**
 * Actualiza la fotografía del profesor.
 */
async function actualizarFotoProfesor(req, res) {
  const profesorId = Number(req.profesor?.id)
  const escuelaId = Number(req.profesor?.escuelaId)

  let fotoAnterior = null
  let fotoNueva = null

  try {
    if (
      !Number.isSafeInteger(profesorId) ||
      profesorId <= 0 ||
      ![1, 2].includes(escuelaId)
    ) {
      if (req.file) {
        fs.unlink(req.file.path, () => {})
      }

      return res.status(401).json({
        ok: false,
        mensaje: 'La sesión del profesor no es válida.'
      })
    }

    const autorizado = await comprobarAutorizacion(
      profesorId,
      escuelaId
    )

    if (!autorizado) {
      if (req.file) {
        fs.unlink(req.file.path, () => {})
      }

      return res.status(403).json({
        ok: false,
        mensaje:
          'No estás autorizado para modificar este perfil.'
      })
    }

    if (!req.file) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Selecciona una imagen para la foto de perfil.'
      })
    }

    const [profesores] = await db.query(
      `SELECT foto
       FROM profesores
       WHERE id = ?
         AND activo = 1
       LIMIT 1`,
      [profesorId]
    )

    if (!profesores.length) {
      fs.unlink(req.file.path, () => {})

      return res.status(404).json({
        ok: false,
        mensaje: 'No se ha encontrado el perfil del profesor.'
      })
    }

    fotoAnterior = profesores[0].foto
    fotoNueva = `/uploads/fotos/tutores/${req.file.filename}`

    await db.query(
      `UPDATE profesores
       SET foto = ?
       WHERE id = ?
         AND activo = 1`,
      [fotoNueva, profesorId]
    )

    // Borrar la fotografía anterior solo si estaba en
    // la carpeta de fotos de profesores de esta aplicación.
    if (fotoAnterior) {
      const nombreAnterior = path.basename(fotoAnterior)
      const rutaAnterior = path.join(
        CARPETA_FOTOS,
        nombreAnterior
      )

      const esFotoLocal =
        fotoAnterior.startsWith('/uploads/fotos/tutores/') &&
        nombreAnterior !== '.' &&
        nombreAnterior !== '..'

      if (
        esFotoLocal &&
        nombreAnterior !== req.file.filename
      ) {
        fs.unlink(rutaAnterior, (error) => {
          if (error && error.code !== 'ENOENT') {
            console.error(
              'No se pudo eliminar la fotografía anterior:',
              error
            )
          }
        })
      }
    }

    return res.json({
      ok: true,
      mensaje: 'La foto de perfil se ha actualizado correctamente.',
      foto: fotoNueva
    })
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, () => {})
    }

    console.error(
      'Error al actualizar la foto del profesor:',
      error
    )

    return res.status(500).json({
      ok: false,
      mensaje: 'No se ha podido guardar la foto.'
    })
  }
}

module.exports = {
  getMiPerfilProfesor,
  actualizarDatosProfesor,
  actualizarFotoProfesor
}