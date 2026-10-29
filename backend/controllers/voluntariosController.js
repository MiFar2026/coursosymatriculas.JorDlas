
const db = require('../config/voluntariosDB')

const tareasPermitidas = [
  'profesor',
  'acompanante',
  'comida',
  'mantenimiento',
  'administrativo',
  'esponsor_financiero'
]

const tiposDocumentoPermitidos = [
  'DNI',
  'NIE',
  'PASAPORTE'
]

function limpiarTexto(valor, maximo) {
  if (typeof valor !== 'string') return ''
  return valor.trim().slice(0, maximo)
}

async function crearVoluntario(req, res) {
  const body = req.body || {}

  const nombre = limpiarTexto(body.nombre, 100)
  const apellidos = limpiarTexto(body.apellidos, 150)
  const lugar = limpiarTexto(body.lugar_residencia, 150)
  const documento = limpiarTexto(body.documento_identidad, 40)
  const tipoDocumento = body.tipo_documento
  const telefono = limpiarTexto(body.telefono, 30)
  const email = limpiarTexto(body.email, 254).toLowerCase()
  const tarea = body.tarea
  const mensaje = limpiarTexto(body.mensaje, 3000)
  const anio = Number(body.anyo_nacimiento)

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (
    !nombre ||
    !apellidos ||
    !lugar ||
    !documento ||
    !tiposDocumentoPermitidos.includes(tipoDocumento) ||
    !telefono ||
    !emailValido ||
    !Number.isInteger(anio) ||
    anio < 1900 ||
    anio > new Date().getFullYear() ||
    !tareasPermitidas.includes(tarea) ||
    !mensaje ||
    body.privacidad !== true
  ) {
    return res.status(400).json({
      error: 'Revisa los datos y acepta la información de privacidad.'
    })
  }

  try {
    const sql = `
      INSERT INTO voluntarios (
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
        privacidad
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const valores = [
      nombre,
      apellidos,
      anio,
      lugar,
      documento,
      tipoDocumento,
      telefono,
      email,
      tarea,
      mensaje,
      1
    ]

    const [resultado] = await db.execute(sql, valores)

    return res.status(201).json({
      ok: true,
      id: resultado.insertId,
      mensaje: 'Solicitud de voluntariado recibida correctamente.'
    })
  } catch (error) {
    console.error(
      'Error al guardar la solicitud:',
      error.code,
      error.message
    )

    return res.status(500).json({
      error: 'No se ha podido guardar la solicitud. Inténtalo de nuevo.'
    })
  }
}

module.exports = { crearVoluntario }
