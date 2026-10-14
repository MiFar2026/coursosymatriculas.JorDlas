
const jwt = require('jsonwebtoken')
require('dotenv').config()

function authAdmin(req, res, next) {
    const autorizacion = req.headers.authorization || ''
    const partes = autorizacion.split(' ')

    if (
        partes.length !== 2 ||
        partes[0] !== 'Bearer' ||
        !partes[1]
    ) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Debes iniciar sesión como administrador.'
        })
    }

    const secreto = process.env.JWT_SECRET

    if (!secreto) {
        return res.status(500).json({
            ok: false,
            mensaje: 'La autenticación no está configurada.'
        })
    }

    try {
        const datos = jwt.verify(partes[1], secreto, {
            issuer: 'cursos-generales',
            audience: 'administracion'
        })

        if (
            datos.rol !== 'admin' ||
            datos.usuario !== process.env.ADMIN_USER
        ) {
            return res.status(403).json({
                ok: false,
                mensaje: 'No tienes permisos de administrador.'
            })
        }

        req.admin = {
            usuario: datos.usuario,
            rol: datos.rol
        }

        next()
    } catch (error) {
        return res.status(401).json({
            ok: false,
            mensaje: 'La sesión ha caducado o no es válida. Inicia sesión de nuevo.'
        })
    }
}

module.exports = authAdmin
