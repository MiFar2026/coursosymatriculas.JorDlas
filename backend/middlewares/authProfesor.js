
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

        if (
            sesion.tipo !== 'profesor' ||
            !Number.isInteger(sesion.profesorId) ||
            ![1, 2].includes(sesion.escuelaId)
        ) {
            return res.status(401).json({
                ok: false,
                mensaje: 'La sesión no es válida.'
            })
        }

        req.profesor = {
            id: sesion.profesorId,
            escuelaId: sesion.escuelaId
        }

        next()
    } catch (error) {
        return res.status(401).json({
            ok: false,
            mensaje: 'La sesión ha caducado o no es válida.'
        })
    }
}

module.exports = authProfesor
