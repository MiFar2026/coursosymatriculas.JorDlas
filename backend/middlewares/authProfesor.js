const jwt = require('jsonwebtoken')

function authProfesor(req, res, next) {
  const token = req.cookies?.sesionProfesor
  const secret = process.env.JWT_PROFESOR_SECRET

  if (!secret || !token) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Debes iniciar sesión como profesor.'
    })
  }

  try {
    const sesion = jwt.verify(token, secret)

    const profesorId = Number(sesion.profesorId)
    const escuelaId = Number(sesion.escuelaId)

    if (
      sesion.tipo !== 'profesor' ||
      !Number.isSafeInteger(profesorId) ||
      profesorId <= 0 ||
      ![1, 2].includes(escuelaId)
    ) {
      return res.status(401).json({
        ok: false,
        mensaje: 'La sesión no es válida.'
      })
    }

    req.profesor = {
      id: profesorId,
      escuelaId
    }

    return next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      mensaje: 'La sesión ha caducado o no es válida.'
    })
  }
}

module.exports = authProfesor