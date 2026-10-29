const jwt = require('jsonwebtoken')
require('dotenv').config()

function authAdmin(req, res, next) {
    const autorizacion = req.headers.authorization || ''

    // 1. Diagnóstico de la petición.
    console.log('AUTH ADMIN:', req.method, req.originalUrl)
    console.log(
        'AUTHORIZATION PRESENTE:',
        Boolean(autorizacion)
    )

    // 2. Comprobar que llega el token Bearer.
    const partes = autorizacion.trim().split(/\s+/)

    if (
        partes.length !== 2 ||
        partes[0] !== 'Bearer' ||
        !partes[1]
    ) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Falta el token de administrador. Inicia sesión de nuevo.'
        })
    }

    // 3. Comprobar la configuración del backend.
    const secreto = process.env.JWT_SECRET
    const usuarioConfigurado = process.env.ADMIN_USER

    if (!secreto || !usuarioConfigurado) {
        console.error(
            'AUTH ADMIN: falta JWT_SECRET o ADMIN_USER en backend/.env'
        )

        return res.status(500).json({
            ok: false,
            mensaje: 'La autenticación de administrador no está configurada correctamente.'
        })
    }

    // 4. Verificar la firma, el emisor y la audiencia del token.
    let datos

    try {
        datos = jwt.verify(partes[1], secreto, {
            issuer: 'cursos-generales',
            audience: 'administracion'
        })
    } catch (error) {
        console.error(
            'AUTH ADMIN: error al verificar el token:',
            error.name
        )

        return res.status(401).json({
            ok: false,
            mensaje: 'La sesión ha caducado o no es válida. Inicia sesión de nuevo.'
        })
    }

    // 5. Comprobar que el token pertenece al administrador configurado.
    if (
        datos.rol !== 'admin' ||
        datos.usuario !== usuarioConfigurado
    ) {
        console.error(
            'AUTH ADMIN: el rol o el usuario del token no coincide.'
        )

        return res.status(403).json({
            ok: false,
            mensaje: 'No tienes permisos de administrador.'
        })
    }

    // 6. Guardar los datos del administrador autenticado.
    req.admin = {
        usuario: datos.usuario,
        rol: datos.rol
    }

    // 7. Permitir que continúe la petición.
    next()
}

module.exports = authAdmin