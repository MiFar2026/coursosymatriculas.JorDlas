const db = require('../config/voluntariosDB')

async function listarVoluntarios(req, res) {
  try {
    const [filas] = await db.execute(`
      SELECT
        id,
        nombre,
        apellidos,
        anyo_nacimiento,
        lugar_residencia,
        documento_identidad,
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
    console.error('Error al listar voluntarios:', error.code, error.message)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron cargar las solicitudes de voluntariado.'
    })
  }
}

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
    const [resultado] = await db.execute(
      `UPDATE voluntarios SET estado = ? WHERE id = ?`,
      [estado, id]
    )

    if (resultado.affectedRows === 0) {
      const [filas] = await db.execute(
        'SELECT id FROM voluntarios WHERE id = ?',
        [id]
      )

      if (filas.length === 0) {
        return res.status(404).json({
          ok: false,
          mensaje: 'No se encontró la solicitud.'
        })
      }
    }

    return res.json({
      ok: true,
      mensaje: 'Estado de la solicitud actualizado correctamente.'
    })
  } catch (error) {
    console.error('Error al cambiar estado:', error)
//    console.error('Error al cambiar estado:', error.code, error.message)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo actualizar la solicitud.'
    })
  }
}

module.exports = {
  listarVoluntarios,
  cambiarEstadoVoluntario
}