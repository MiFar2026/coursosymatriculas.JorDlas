
const voluntariosDB = require('../config/voluntariosDB')
const profesoresDB = require('../config/database')

// LISTAR SOLICITUDES DE VOLUNTARIADO
async function listarVoluntarios(req, res) {
  try {
    const [filas] = await voluntariosDB.execute(`
      SELECT
        id,
        nombre,
        apellidos,
        anyo_nacimiento,
        lugar_residencia,
        documento_identidad,
        tipo_documento,
        telefono,
        email,
        tarea,
        mensaje,
        privacidad,
        estado,
        fecha_solicitud
      FROM voluntarios
      ORDER BY fecha_solicitud DESC
    `)

    return res.json({
      ok: true,
      datos: filas
    })
  } catch (error) {
    console.error(
      'Error al listar voluntarios:',
      error.code,
      error.message
    )

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron cargar las solicitudes de voluntariado.'
    })
  }
}

// CAMBIAR ESTADO DE UNA SOLICITUD
async function cambiarEstadoVoluntario(req, res) {
  const id = Number(req.params.id)
  const { estado } = req.body || {}

  const estadosPermitidos = [
    'pendiente',
    'aceptada',
    'no_aceptada'
  ]

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El identificador de la solicitud no es válido.'
    })
  }

  if (!estadosPermitidos.includes(estado)) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El estado seleccionado no es válido.'
    })
  }

  try {
    // Recuperamos la solicitud completa.
    const [solicitudes] = await voluntariosDB.execute(
      `SELECT
        id,
        nombre,
        apellidos,
        anyo_nacimiento,
        documento_identidad,
        tipo_documento,
        telefono,
        email,
        tarea,
        estado
       FROM voluntarios
       WHERE id = ?
       LIMIT 1`,
      [id]
    )

    if (solicitudes.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'No se encontró la solicitud.'
      })
    }

    const voluntario = solicitudes[0]

    // Si se acepta una solicitud de profesor, creamos su ficha primero.
    if (estado === 'aceptada' && voluntario.tarea === 'profesor') {
      const tipoDocumento = String(
        voluntario.tipo_documento || ''
      ).trim().toUpperCase()

      const documento = String(
        voluntario.documento_identidad || ''
      ).trim()

      const email = String(
        voluntario.email || ''
      ).trim()

      const nombre = String(
        voluntario.nombre || ''
      ).trim()

      const apellidos = String(
        voluntario.apellidos || ''
      ).trim()

      const tiposPermitidos = ['DNI', 'NIE', 'PASAPORTE']

      if (
        !tiposPermitidos.includes(tipoDocumento) ||
        !documento ||
        !nombre ||
        !apellidos
      ) {
        return res.status(400).json({
          ok: false,
          mensaje:
            'No se puede aceptar esta solicitud como profesor. Comprueba que tenga tipo de documento, número de documento, nombre y apellidos.'
        })
      }

      if (documento.length > 30 || nombre.length > 100 ||
          apellidos.length > 100 || email.length > 150) {
        return res.status(400).json({
          ok: false,
          mensaje:
            'Alguno de los datos supera la longitud permitida en la ficha del profesor.'
        })
      }

      // Comprobamos si el documento o el correo ya están registrados.
      const [profesoresExistentes] = await profesoresDB.execute(
        `SELECT
          id,
          tipo_documento,
          documento,
          nombre,
          apellidos,
          email
         FROM profesores
         WHERE documento = ?
            OR (email = ? AND email IS NOT NULL AND email <> '')
         LIMIT 2`,
        [documento, email]
      )

      if (profesoresExistentes.length > 0) {
        const mismoProfesor = profesoresExistentes.some(profesor =>
          profesor.tipo_documento === tipoDocumento &&
          profesor.documento === documento &&
          profesor.nombre.trim().toLowerCase() === nombre.toLowerCase() &&
          profesor.apellidos.trim().toLowerCase() === apellidos.toLowerCase() &&
          (
            !email ||
            !profesor.email ||
            profesor.email.trim().toLowerCase() === email.toLowerCase()
          )
        )

        if (!mismoProfesor) {
          return res.status(409).json({
            ok: false,
            mensaje:
              'No se puede aceptar la solicitud: el documento o el correo ya pertenece a otro profesor. Comprueba los datos antes de continuar.'
          })
        }

        // Si la ficha ya existe y coincide, continuamos sin duplicarla.
      } else {
        // Creamos la ficha en BaseDeDatosEscuelas.
        await profesoresDB.execute(
          `INSERT INTO profesores (
            tipo_documento,
            documento,
            nombre,
            apellidos,
            anio_nacimiento,
            telefono,
            email,
            especialidad,
            foto
          ) VALUES (?, ?, ?, ?, ?, ?, ?, NULL, NULL)`,
          [
            tipoDocumento,
            documento,
            nombre,
            apellidos,
            voluntario.anyo_nacimiento || null,
            voluntario.telefono || null,
            email || null
          ]
        )
      }
    }

    // Solo llegamos aquí si la ficha del profesor se ha creado
    // correctamente o ya existe una ficha coincidente.
    const [resultado] = await voluntariosDB.execute(
      `UPDATE voluntarios
       SET estado = ?
       WHERE id = ?`,
      [estado, id]
    )

    return res.json({
      ok: true,
      mensaje:
        estado === 'aceptada' && voluntario.tarea === 'profesor'
          ? 'Solicitud aceptada y ficha de profesor comprobada correctamente.'
          : 'Estado de la solicitud actualizado correctamente.'
    })
  } catch (error) {
    console.error(
      'Error al cambiar estado del voluntario:',
      error.code,
      error.message
    )

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        mensaje:
          'No se pudo crear el profesor porque el documento o el correo ya están registrados. Comprueba los datos antes de aceptar la solicitud.'
      })
    }

    return res.status(500).json({
      ok: false,
      mensaje:
        'No se pudo completar la operación. Comprueba las tablas y las conexiones de las bases de datos.'
    })
  }
}

module.exports = {
  listarVoluntarios,
  cambiarEstadoVoluntario
}
