
const jwt = require('jsonwebtoken')

function autenticarAlumno(req, res, next) {
  const token = req.cookies?.sesion_alumno

  if (!token) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Debes iniciar sesión para consultar tu perfil.'
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
    const datos = jwt.verify(token, process.env.JWT_SECRET)

    if (
      datos.tipo !== 'alumno' ||
      !Number.isInteger(datos.alumnoId) ||
      datos.alumnoId < 1
    ) {
      return res.status(401).json({
        ok: false,
        mensaje: 'La sesión no es válida.'
      })
    }

    req.alumnoId = datos.alumnoId

    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      mensaje: 'La sesión ha caducado o no es válida.'
    })
  }
}

module.exports = autenticarAlumno
