const db = require('../config/database')

// =====================================================
// VALIDAR IDENTIFICADORES
// =====================================================

function obtenerIdValido(valor) {
    const id = Number(valor)

    if (!Number.isSafeInteger(id) || id <= 0) {
        return null
    }

    return id
}

// =====================================================
// 1. FORO DE ESTUDIANTES
// GET /api/admin/moderacion/foro-estudiantes
// =====================================================

async function getForoEstudiantes(req, res) {
    try {
        const [mensajes] = await db.query(`
            SELECT
                fm.id,
                fm.grupo_id,
                fm.alumno_id,
                fm.profesor_id,
                fm.mensaje,
                fm.fecha_creacion,
                fm.activo,
                e.nombre AS escuela,
                g.nombre AS grupo,
                COALESCE(
                    NULLIF(
                        CONCAT(a.nombre, ' ', a.apellidos),
                        ' '
                    ),
                    NULLIF(
                        CONCAT(p.nombre, ' ', p.apellidos),
                        ' '
                    ),
                    'Usuario no disponible'
                ) AS autor
            FROM foro_mensajes fm
            INNER JOIN grupos g
                ON g.id = fm.grupo_id
            INNER JOIN escuelas e
                ON e.id = g.escuela_id
            LEFT JOIN alumnos a
                ON a.id = fm.alumno_id
            LEFT JOIN profesores p
                ON p.id = fm.profesor_id
            ORDER BY fm.fecha_creacion DESC, fm.id DESC
        `)

        return res.status(200).json({
            ok: true,
            mensaje: mensajes.length
                ? 'Mensajes del foro consultados correctamente.'
                : 'Todavía no hay mensajes en el foro de estudiantes.',
            datos: mensajes
        })
    } catch (error) {
        console.error(
            'Error al consultar el foro de estudiantes:',
            error.message
        )

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo consultar el foro de estudiantes.'
        })
    }
}

// =====================================================
// OCULTAR MENSAJE DEL FORO DE ESTUDIANTES
// PATCH /api/admin/moderacion/foro-estudiantes/:id/ocultar
// =====================================================

async function ocultarMensajeEstudiante(req, res) {
    const id = obtenerIdValido(req.params.id)

    if (!id) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador del mensaje no es válido.'
        })
    }

    try {
        const [result] = await db.query(
            `UPDATE foro_mensajes
             SET activo = 0
             WHERE id = ? AND activo = 1`,
            [id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El mensaje no existe o ya está oculto.'
            })
        }

        return res.status(200).json({
            ok: true,
            mensaje: 'Mensaje del foro de estudiantes ocultado correctamente.'
        })
    } catch (error) {
        console.error(
            'Error al ocultar un mensaje de estudiantes:',
            error.message
        )

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo ocultar el mensaje.'
        })
    }
}

// =====================================================
// 2. FORO DE PROFESORES
// GET /api/admin/moderacion/foro-profesores
// =====================================================

async function getForoProfesores(req, res) {
    try {
        const [mensajes] = await db.query(`
            SELECT
                fp.id,
                fp.escuela_id,
                fp.profesor_id,
                fp.titulo,
                fp.mensaje,
                fp.fecha_creacion,
                fp.activo,
                e.nombre AS escuela,
                CONCAT(p.nombre, ' ', p.apellidos) AS autor
            FROM foro_profesores fp
            INNER JOIN escuelas e
                ON e.id = fp.escuela_id
            INNER JOIN profesores p
                ON p.id = fp.profesor_id
            ORDER BY fp.fecha_creacion DESC, fp.id DESC
        `)

        return res.status(200).json({
            ok: true,
            mensaje: mensajes.length
                ? 'Mensajes del foro de profesores consultados correctamente.'
                : 'Todavía no hay mensajes en el foro de profesores.',
            datos: mensajes
        })
    } catch (error) {
        console.error(
            'Error al consultar el foro de profesores:',
            error.message
        )

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo consultar el foro de profesores.'
        })
    }
}

// =====================================================
// OCULTAR MENSAJE DEL FORO DE PROFESORES
// PATCH /api/admin/moderacion/foro-profesores/:id/ocultar
// =====================================================

async function ocultarMensajeProfesor(req, res) {
    const id = obtenerIdValido(req.params.id)

    if (!id) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador del mensaje no es válido.'
        })
    }

    try {
        const [result] = await db.query(
            `UPDATE foro_profesores
             SET activo = 0
             WHERE id = ? AND activo = 1`,
            [id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El mensaje no existe o ya está oculto.'
            })
        }

        return res.status(200).json({
            ok: true,
            mensaje: 'Mensaje del foro de profesores ocultado correctamente.'
        })
    } catch (error) {
        console.error(
            'Error al ocultar un mensaje de profesores:',
            error.message
        )

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo ocultar el mensaje.'
        })
    }
}

// =====================================================
// 3. MATERIALES PUBLICADOS
// GET /api/admin/moderacion/recursos
// =====================================================

async function getRecursosAdmin(req, res) {
    try {
        const [recursos] = await db.query(`
            SELECT
                r.id,
                r.escuela_id,
                r.grupo_id,
                r.profesor_id,
                r.titulo,
                r.descripcion,
                r.nombre_archivo,
                r.ruta_archivo,
                r.tipo,
                r.publicado,
                r.fecha_publicacion,
                e.nombre AS escuela,
                g.nombre AS grupo,
                CONCAT(p.nombre, ' ', p.apellidos) AS profesor
            FROM recursos r
            INNER JOIN escuelas e
                ON e.id = r.escuela_id
            INNER JOIN profesores p
                ON p.id = r.profesor_id
            LEFT JOIN grupos g
                ON g.id = r.grupo_id
            ORDER BY r.fecha_publicacion DESC, r.id DESC
        `)

        return res.status(200).json({
            ok: true,
            mensaje: recursos.length
                ? 'Materiales consultados correctamente.'
                : 'Todavía no hay materiales registrados.',
            datos: recursos
        })
    } catch (error) {
        console.error(
            'Error al consultar los materiales:',
            error.message
        )

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudieron consultar los materiales.'
        })
    }
}

// =====================================================
// RETIRAR UN MATERIAL DE LA PUBLICACIÓN
// PATCH /api/admin/moderacion/recursos/:id/retirar
// =====================================================

async function retirarRecurso(req, res) {
    const id = obtenerIdValido(req.params.id)

    if (!id) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador del material no es válido.'
        })
    }

    try {
        const [result] = await db.query(
            `UPDATE recursos
             SET publicado = 0
             WHERE id = ? AND publicado = 1`,
            [id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El material no existe o ya está retirado.'
            })
        }

        return res.status(200).json({
            ok: true,
            mensaje: 'Material retirado de la publicación correctamente.'
        })
    } catch (error) {
        console.error(
            'Error al retirar un material:',
            error.message
        )

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo retirar el material.'
        })
    }
}

module.exports = {
    getForoEstudiantes,
    ocultarMensajeEstudiante,
    getForoProfesores,
    ocultarMensajeProfesor,
    getRecursosAdmin,
    retirarRecurso
}