
const jwt = require('jsonwebtoken')
const Alumno = require('../model/collections/alumnadoModel')

async function iniciarSesionAlumno(req, res) {
  const documento =
    typeof req.body.documento === 'string'
      ? req.body.documento.trim()
      : ''

  const email =
    typeof req.body.email === 'string'
      ? req.body.email.trim()
      : ''

  if (!documento || !email) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Introduce tu documento y correo electrónico.'
    })
  }

  if (!process.env.JWT_SECRET) {
    console.error('Falta configurar JWT_SECRET.')

    return res.status(500).json({
      ok: false,
      mensaje: 'El acceso no está configurado correctamente.'
    })
  }

  try {
    const alumno = await Alumno.buscarAlumnoPorDocumentoYEmail(
      documento,
      email
    )

    if (!alumno) {
      return res.status(401).json({
        ok: false,
        mensaje: 'No se han podido verificar los datos introducidos.'
      })
    }

    const token = jwt.sign(
      { alumnoId: alumno.id, tipo: 'alumno' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )

    res.cookie('sesion_alumno', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000,
      path: '/'
    })

    return res.json({
      ok: true,
      mensaje: 'Acceso correcto.',
      alumno: {
        id: alumno.id,
        nombre: alumno.nombre,
        apellidos: alumno.apellidos
      }
    })
  } catch (error) {
    console.error('Error al iniciar sesión del alumno:', error)

    return res.status(500).json({
      ok: false,
      mensaje: 'No se ha podido iniciar sesión.'
    })
  }
}

function cerrarSesionAlumno(req, res) {
  res.clearCookie('sesion_alumno', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })

  return res.json({
    ok: true,
    mensaje: 'Sesión cerrada correctamente.'
  })
}

module.exports = {
  iniciarSesionAlumno,
  cerrarSesionAlumno
}
