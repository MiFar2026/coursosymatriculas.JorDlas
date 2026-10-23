
const db = require('../config/database')
const fs = require('fs')
const path = require('path')

const CARPETA_FOTOS = path.join(
    __dirname,
    '..',
    'uploads',
    'fotos',
    'tutores'
)

async function comprobarAutorizacion(profesorId, escuelaId) {
    const [filas] = await db.query(
        `SELECT p.id
         FROM profesores p
         INNER JOIN grupos g
             ON g.profesor_id = p.id
         INNER JOIN escuelas e
             ON e.id = g.escuela_id
         WHERE p.id = ?
           AND p.activo = 1
           AND g.activo = 1
           AND g.escuela_id = ?
           AND e.activa = 1
         LIMIT 1`,
        [profesorId, escuelaId]
    )

    return filas.length > 0
}

async function getMiPerfilProfesor(req, res) {
    const profesorId = Number(req.profesor.id)
    const escuelaSesion = Number(req.profesor.escuelaId)

    try {
        const autorizado = await comprobarAutorizacion(
            profesorId,
            escuelaSesion
        )

        if (!autorizado) {
            return res.status(403).json({
                ok: false,
                mensaje: 'No estás autorizado para acceder a este perfil.'
            })
        }

        const [profesores] = await db.query(
            `SELECT
                id,
                nombre,
                apellidos,
                telefono,
                email,
                especialidad,
                foto
             FROM profesores
             WHERE id = ? AND activo = 1
             LIMIT 1`,
            [profesorId]
        )

        if (!profesores.length) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se ha encontrado el perfil del profesor.'
            })
        }

        // Obtener las asignaciones de todas las escuelas del profesor.
        const [asignaciones] = await db.query(
            `SELECT
                e.id AS escuelaId,
                e.nombre AS escuela,
                g.id AS grupoId,
                g.nombre AS grupo,
                g.turno,
                g.aula,
                c.id AS cursoId,
                c.nombre AS curso,
                c.idioma,
                c.nivel,
                h.id AS horarioId,
                h.dia_semana AS diaSemana,
                h.hora_inicio AS horaInicio,
                h.hora_fin AS horaFin
             FROM grupos g
             INNER JOIN escuelas e
                ON e.id = g.escuela_id
             INNER JOIN cursos c
                ON c.id = g.curso_id
             LEFT JOIN horarios h
                ON h.grupo_id = g.id
                AND h.activo = 1
             WHERE g.profesor_id = ?
               AND g.activo = 1
               AND e.activa = 1
               AND c.activo = 1
             ORDER BY
                e.nombre,
                g.nombre,
                FIELD(
                    h.dia_semana,
                    'Lunes', 'Martes', 'Miércoles',
                    'Jueves', 'Viernes', 'Sábado', 'Domingo'
                ),
                h.hora_inicio`,
            [profesorId]
        )

        return res.json({
            ok: true,
            datos: {
                ...profesores[0],
                asignaciones
            }
        })
    } catch (error) {
        console.error('Error al cargar el perfil del profesor:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido cargar el perfil del profesor.'
        })
    }
}

async function actualizarDatosProfesor(req, res) {
    const profesorId = Number(req.profesor.id)
    const escuelaSesion = Number(req.profesor.escuelaId)

    const telefono = typeof req.body.telefono === 'string'
        ? req.body.telefono.trim()
        : ''

    const email = typeof req.body.email === 'string'
        ? req.body.email.trim().toLowerCase()
        : ''

    if (!telefono || telefono.length > 30) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Introduce un teléfono válido de hasta 30 caracteres.'
        })
    }

    if (
        !email ||
        email.length > 150 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Introduce un correo electrónico válido.'
        })
    }

    try {
        const autorizado = await comprobarAutorizacion(
            profesorId,
            escuelaSesion
        )

        if (!autorizado) {
            return res.status(403).json({
                ok: false,
                mensaje: 'No estás autorizado para modificar este perfil.'
            })
        }

        await db.query(
            `UPDATE profesores
             SET telefono = ?, email = ?
             WHERE id = ? AND activo = 1`,
            [telefono, email, profesorId]
        )

        const [filas] = await db.query(
            `SELECT id, nombre, apellidos, telefono, email, foto
             FROM profesores
             WHERE id = ?
             LIMIT 1`,
            [profesorId]
        )

        return res.json({
            ok: true,
            mensaje: 'Los datos del perfil se han actualizado.',
            datos: filas[0]
        })
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                ok: false,
                mensaje: 'Ese correo electrónico ya está asociado a otra cuenta.'
            })
        }

        console.error('Error al actualizar el perfil del profesor:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se han podido guardar los cambios.'
        })
    }
}

async function actualizarFotoProfesor(req, res) {
    const profesorId = Number(req.profesor.id)
    const escuelaSesion = Number(req.profesor.escuelaId)

    try {
        const autorizado = await comprobarAutorizacion(
            profesorId,
            escuelaSesion
        )

        if (!autorizado) {
            if (req.file) {
                fs.unlink(req.file.path, () => {})
            }

            return res.status(403).json({
                ok: false,
                mensaje: 'No estás autorizado para modificar este perfil.'
            })
        }

        if (!req.file) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Selecciona una imagen para la foto de perfil.'
            })
        }

        const foto = '/uploads/fotos/tutores/' + req.file.filename

        await db.query(
            `UPDATE profesores
             SET foto = ?
             WHERE id = ? AND activo = 1`,
            [foto, profesorId]
        )

        return res.json({
            ok: true,
            mensaje: 'La foto de perfil se ha actualizado.',
            foto
        })
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, () => {})
        }

        console.error('Error al actualizar la foto del profesor:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido guardar la foto.'
        })
    }
}

module.exports = {
    getMiPerfilProfesor,
    actualizarDatosProfesor,
    actualizarFotoProfesor
}
