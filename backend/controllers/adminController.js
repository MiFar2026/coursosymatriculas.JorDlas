
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function loginAdmin(req, res) {
    try {
        const { usuario, contrasena } = req.body || {}

        if (
            typeof usuario !== 'string' ||
            typeof contrasena !== 'string' ||
            !usuario.trim() ||
            !contrasena
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Introduce el usuario y la contraseña.'
            })
        }

        const usuarioAdmin = process.env.ADMIN_USER
        const hashAdmin = process.env.ADMIN_PASSWORD_HASH
        const secreto = process.env.JWT_SECRET

        if (!usuarioAdmin || !hashAdmin || !secreto) {
            console.error('Falta configurar el acceso de administrador.')
            return res.status(500).json({
                ok: false,
                mensaje: 'El acceso de administrador no está configurado.'
            })
        }

        const usuarioCorrecto = usuario.trim() === usuarioAdmin

        // También se comprueba una contraseña ficticia si el usuario no coincide.
        // Esto reduce diferencias de tiempo entre algunos intentos de acceso.
        const hashAComprobar = usuarioCorrecto
            ? hashAdmin
            : await bcrypt.hash('contraseña-ficticia-no-valida', 12)

        const contrasenaCorrecta = await bcrypt.compare(
            contrasena,
            hashAComprobar
        )

        if (!usuarioCorrecto || !contrasenaCorrecta) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrectos.'
            })
        }

        const token = jwt.sign(
            {
                rol: 'admin',
                usuario: usuarioAdmin
            },
            secreto,
            {
                expiresIn: '30m',
                issuer: 'cursos-generales',
                audience: 'administracion'
            }
        )

        return res.status(200).json({
            ok: true,
            mensaje: 'Inicio de sesión correcto.',
            token,
            expiraEn: 1800
        })
    } catch (error) {
        console.error('Error en el inicio de sesión:', error.message)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo iniciar sesión.'
        })
    }
}

module.exports = { loginAdmin }
