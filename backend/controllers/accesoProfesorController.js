
const db = require('../config/database')
const jwt = require('jsonwebtoken')

const DURACION_SESION_MS = 2 * 60 * 60 * 1000

function opcionesCookie() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: DURACION_SESION_MS
    }
}

// POST /api/acceso-profesor/login
const iniciarSesionProfesor = async (req, res) => {
    try {
        const {
            documento,
            telefono,
            anioNacimiento,
            email,
            escuela
        } = req.body

        const secret = process.env.JWT_PROFESOR_SECRET

        if (!secret) {
            console.error('Falta configurar JWT_PROFESOR_SECRET.')
            return res.status(500).json({
                ok: false,
                mensaje: 'La autenticación del profesorado no está configurada.'
            })
        }

        if (
            typeof documento !== 'string' ||
            !documento.trim() ||
            typeof telefono !== 'string' ||
            !telefono.trim() ||
            typeof email !== 'string' ||
            !email.trim() ||
            !Number.isInteger(Number(anioNacimiento)) ||
            Number(anioNacimiento) < 1900 ||
            Number(anioNacimiento) > new Date().getFullYear() ||
            !['ateneu', 'joanmiro'].includes(escuela)
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Completa correctamente todos los campos.'
            })
        }

        // Joan Miró = 1; Ateneu = 2.
        const escuelaId = escuela === 'joanmiro' ? 1 : 2

        const [profesores] = await db.query(
            `SELECT
                p.id,
                p.nombre,
                p.apellidos,
                e.id AS escuela_id,
                e.nombre AS escuela_nombre
             FROM profesores p
             INNER JOIN grupos g
                ON g.profesor_id = p.id
             INNER JOIN escuelas e
                ON e.id = g.escuela_id
             WHERE p.documento = ?
               AND p.telefono = ?
               AND p.anio_nacimiento = ?
               AND LOWER(p.email) = LOWER(?)
               AND p.activo = 1
               AND g.activo = 1
               AND e.activa = 1
               AND e.id = ?
             LIMIT 1`,
            [
                documento.trim(),
                telefono.trim(),
                Number(anioNacimiento),
                email.trim(),
                escuelaId
            ]
        )

        if (profesores.length === 0) {
            return res.status(401).json({
                ok: false,
                mensaje: 'No se ha podido verificar el acceso con esos datos y esa escuela.'
            })
        }

        const profesor = profesores[0]

        // Crear un token exclusivo para el profesorado.
        const token = jwt.sign(
            {
                tipo: 'profesor',
                profesorId: Number(profesor.id),
                escuelaId: Number(profesor.escuela_id)
            },
            secret,
            { expiresIn: '2h' }
        )

        // La cookie no puede leerse desde JavaScript del navegador.
        res.cookie('sesionProfesor', token, opcionesCookie())

        return res.status(200).json({
            ok: true,
            mensaje: 'Acceso verificado correctamente.',
            profesor: {
                id: profesor.id,
                nombre: profesor.nombre,
                apellidos: profesor.apellidos,
                escuelaId: profesor.escuela_id,
                escuela: profesor.escuela_nombre
            }
        })
    } catch (error) {
        console.error('Error en acceso de profesor:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno al verificar el acceso.'
        })
    }
}

// GET /api/acceso-profesor/session
// Comprueba la cookie y que el profesor siga autorizado en esa escuela.
const comprobarSesionProfesor = async (req, res) => {
    try {
        const profesorId = req.profesor.id
        const escuelaId = req.profesor.escuelaId

        const [resultados] = await db.query(
            `SELECT
                p.id,
                p.nombre,
                p.apellidos,
                e.id AS escuela_id,
                e.nombre AS escuela_nombre
             FROM profesores p
             INNER JOIN grupos g
                ON g.profesor_id = p.id
             INNER JOIN escuelas e
                ON e.id = g.escuela_id
             WHERE p.id = ?
               AND e.id = ?
               AND p.activo = 1
               AND g.activo = 1
               AND e.activa = 1
             LIMIT 1`,
            [profesorId, escuelaId]
        )

        if (resultados.length === 0) {
            res.clearCookie('sesionProfesor', opcionesCookie())

            return res.status(401).json({
                ok: false,
                mensaje: 'El profesor ya no está autorizado para esta escuela.'
            })
        }

        const profesor = resultados[0]

        return res.json({
            ok: true,
            profesor: {
                id: profesor.id,
                nombre: profesor.nombre,
                apellidos: profesor.apellidos,
                escuelaId: profesor.escuela_id,
                escuela: profesor.escuela_nombre
            }
        })
    } catch (error) {
        console.error('Error al comprobar la sesión del profesor:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido comprobar la sesión.'
        })
    }
}

// POST /api/acceso-profesor/logout
const cerrarSesionProfesor = (req, res) => {
    res.clearCookie('sesionProfesor', opcionesCookie())

    return res.json({
        ok: true,
        mensaje: 'Sesión cerrada correctamente.'
    })
}

module.exports = {
    iniciarSesionProfesor,
    comprobarSesionProfesor,
    cerrarSesionProfesor
}
