const db = require('../config/database')

// =====================================================
// VALIDACIÓN COMÚN
// =====================================================

function responderError(res, status, mensaje) {
    return res.status(status).json({
        ok: false,
        mensaje
    })
}

function obtenerIdPositivo(valor) {
    const id = Number(valor)

    return Number.isSafeInteger(id) && id > 0
        ? id
        : null
}

function validarTexto(valor) {
    return typeof valor === 'string'
        ? valor.trim()
        : ''
}

// =====================================================
// GRUPOS DEL ALUMNO
// Solo muestra sus matrículas activas y profesores asignados.
// =====================================================

async function listarGruposAlumno(req, res) {
    try {
        const [grupos] = await db.execute(
            `SELECT
                g.id AS grupo_id,
                g.nombre AS grupo_nombre,
                g.escuela_id,
                e.nombre AS escuela_nombre,
                c.nombre AS curso_nombre,
                p.id AS profesor_id,
                CONCAT(p.nombre, ' ', p.apellidos) AS profesor_nombre
             FROM matriculas m
             INNER JOIN grupos g ON g.id = m.grupo_id
             INNER JOIN escuelas e ON e.id = g.escuela_id
             INNER JOIN cursos c ON c.id = g.curso_id
             INNER JOIN profesores p ON p.id = g.profesor_id
             WHERE m.alumno_id = ?
               AND m.estado = 'ACTIVA'
               AND g.activo = 1
               AND e.activa = 1
               AND p.activo = 1
             ORDER BY e.nombre, c.nombre, g.nombre`,
            [req.alumnoId]
        )

        return res.json({
            ok: true,
            grupos
        })
    } catch (error) {
        console.error('Error al listar grupos del alumno:', error)

        return responderError(
            res,
            500,
            'No se pudieron cargar tus grupos.'
        )
    }
}

// =====================================================
// GRUPOS DEL PROFESOR
// Solo sus grupos de su escuela autenticada.
// =====================================================

async function listarGruposProfesor(req, res) {
    try {
        const [grupos] = await db.execute(
            `SELECT
                g.id AS grupo_id,
                g.nombre AS grupo_nombre,
                g.escuela_id,
                e.nombre AS escuela_nombre,
                c.nombre AS curso_nombre,
                COUNT(
                    CASE WHEN m.estado = 'ACTIVA' AND a.activo = 1
                    THEN 1 END
                ) AS total_alumnos
             FROM grupos g
             INNER JOIN escuelas e ON e.id = g.escuela_id
             INNER JOIN cursos c ON c.id = g.curso_id
             LEFT JOIN matriculas m ON m.grupo_id = g.id
             LEFT JOIN alumnos a ON a.id = m.alumno_id
             WHERE g.profesor_id = ?
               AND g.escuela_id = ?
               AND g.activo = 1
               AND e.activa = 1
             GROUP BY
                g.id, g.nombre, g.escuela_id,
                e.nombre, c.nombre
             ORDER BY c.nombre, g.nombre`,
            [req.profesor.id, req.profesor.escuelaId]
        )

        return res.json({
            ok: true,
            grupos
        })
    } catch (error) {
        console.error('Error al listar grupos del profesor:', error)

        return responderError(
            res,
            500,
            'No se pudieron cargar tus grupos.'
        )
    }
}

// =====================================================
// ALUMNOS DE UN GRUPO DEL PROFESOR
// =====================================================

async function listarAlumnosGrupoProfesor(req, res) {
    const grupoId = obtenerIdPositivo(req.params.grupoId)

    if (!grupoId) {
        return responderError(res, 400, 'El grupo no es válido.')
    }

    try {
        const [grupos] = await db.execute(
            `SELECT g.id
             FROM grupos g
             INNER JOIN escuelas e ON e.id = g.escuela_id
             WHERE g.id = ?
               AND g.profesor_id = ?
               AND g.escuela_id = ?
               AND g.activo = 1
               AND e.activa = 1
             LIMIT 1`,
            [
                grupoId,
                req.profesor.id,
                req.profesor.escuelaId
            ]
        )

        if (!grupos.length) {
            return responderError(
                res,
                403,
                'No tienes permiso para consultar este grupo.'
            )
        }

        const [alumnos] = await db.execute(
            `SELECT
                a.id AS alumno_id,
                a.nombre,
                a.apellidos,
                m.grupo_id
             FROM matriculas m
             INNER JOIN alumnos a ON a.id = m.alumno_id
             WHERE m.grupo_id = ?
               AND m.estado = 'ACTIVA'
               AND a.activo = 1
             ORDER BY a.apellidos, a.nombre`,
            [grupoId]
        )

        return res.json({
            ok: true,
            alumnos
        })
    } catch (error) {
        console.error('Error al listar alumnos del grupo:', error)

        return responderError(
            res,
            500,
            'No se pudieron cargar los alumnos del grupo.'
        )
    }
}

// =====================================================
// COMPROBAR CONVERSACIÓN DEL ALUMNO
// No se acepta escuela_id ni profesor_id desde el cliente.
// =====================================================

async function obtenerConversacionAlumno(alumnoId, grupoId) {
    const [filas] = await db.execute(
        `SELECT
            g.id AS grupo_id,
            g.escuela_id,
            g.profesor_id
         FROM matriculas m
         INNER JOIN grupos g ON g.id = m.grupo_id
         INNER JOIN escuelas e ON e.id = g.escuela_id
         INNER JOIN alumnos a ON a.id = m.alumno_id
         INNER JOIN profesores p ON p.id = g.profesor_id
         WHERE m.alumno_id = ?
           AND g.id = ?
           AND m.estado = 'ACTIVA'
           AND g.activo = 1
           AND e.activa = 1
           AND a.activo = 1
           AND p.activo = 1
         LIMIT 1`,
        [alumnoId, grupoId]
    )

    return filas[0] || null
}

// =====================================================
// COMPROBAR CONVERSACIÓN DEL PROFESOR
// =====================================================

async function obtenerConversacionProfesor(
    profesorId,
    escuelaId,
    grupoId,
    alumnoId
) {
    const [filas] = await db.execute(
        `SELECT
            g.id AS grupo_id,
            g.escuela_id,
            g.profesor_id,
            a.id AS alumno_id
         FROM grupos g
         INNER JOIN escuelas e ON e.id = g.escuela_id
         INNER JOIN matriculas m ON m.grupo_id = g.id
         INNER JOIN alumnos a ON a.id = m.alumno_id
         WHERE g.id = ?
           AND a.id = ?
           AND g.profesor_id = ?
           AND g.escuela_id = ?
           AND g.activo = 1
           AND e.activa = 1
           AND a.activo = 1
           AND m.estado = 'ACTIVA'
         LIMIT 1`,
        [grupoId, alumnoId, profesorId, escuelaId]
    )

    return filas[0] || null
}

// =====================================================
// LEER MENSAJES
// =====================================================

async function leerMensajes(req, res, tipo) {
    const grupoId = obtenerIdPositivo(req.params.grupoId)
    const alumnoId = tipo === 'ALUMNO'
        ? req.alumnoId
        : obtenerIdPositivo(req.params.alumnoId)

    if (!grupoId || !alumnoId) {
        return responderError(
            res,
            400,
            'El grupo o el alumno no son válidos.'
        )
    }

    try {
        let conversacion

        if (tipo === 'ALUMNO') {
            conversacion = await obtenerConversacionAlumno(
                alumnoId,
                grupoId
            )
        } else {
            conversacion = await obtenerConversacionProfesor(
                req.profesor.id,
                req.profesor.escuelaId,
                grupoId,
                alumnoId
            )
        }

        if (!conversacion) {
            return responderError(
                res,
                403,
                'No tienes permiso para consultar esta conversación.'
            )
        }

        const [mensajes] = await db.execute(
            `SELECT
                id,
                remitente_tipo,
                remitente_id,
                mensaje,
                fecha_envio
             FROM mensajes_privados
             WHERE escuela_id = ?
               AND grupo_id = ?
               AND alumno_id = ?
               AND profesor_id = ?
               AND estado = 'VISIBLE'
             ORDER BY id ASC`,
            [
                conversacion.escuela_id,
                conversacion.grupo_id,
                alumnoId,
                conversacion.profesor_id
            ]
        )

        return res.json({
            ok: true,
            mensajes
        })
    } catch (error) {
        console.error('Error al leer mensajes privados:', error)

        return responderError(
            res,
            500,
            'No se pudieron cargar los mensajes.'
        )
    }
}

async function leerMensajesAlumno(req, res) {
    return leerMensajes(req, res, 'ALUMNO')
}

async function leerMensajesProfesor(req, res) {
    return leerMensajes(req, res, 'PROFESOR')
}

// =====================================================
// ENVIAR MENSAJE
// El mensaje es inmutable: no hay función de edición.
// =====================================================

async function enviarMensaje(req, res, tipo) {
    const grupoId = obtenerIdPositivo(req.params.grupoId)
    const alumnoId = tipo === 'ALUMNO'
        ? req.alumnoId
        : obtenerIdPositivo(req.params.alumnoId)

    const texto = validarTexto(req.body?.mensaje)

    if (!grupoId || !alumnoId) {
        return responderError(
            res,
            400,
            'El grupo o el alumno no son válidos.'
        )
    }

    if (!texto) {
        return responderError(res, 400, 'Escribe un mensaje.')
    }

    if (texto.length > 3000) {
        return responderError(
            res,
            400,
            'El mensaje admite 3000 caracteres como máximo.'
        )
    }

    try {
        let conversacion

        if (tipo === 'ALUMNO') {
            conversacion = await obtenerConversacionAlumno(
                alumnoId,
                grupoId
            )
        } else {
            conversacion = await obtenerConversacionProfesor(
                req.profesor.id,
                req.profesor.escuelaId,
                grupoId,
                alumnoId
            )
        }

        if (!conversacion) {
            return responderError(
                res,
                403,
                'No tienes permiso para escribir en esta conversación.'
            )
        }

        const remitenteId = tipo === 'ALUMNO'
            ? req.alumnoId
            : req.profesor.id

        const [resultado] = await db.execute(
            `INSERT INTO mensajes_privados (
                escuela_id,
                grupo_id,
                alumno_id,
                profesor_id,
                remitente_tipo,
                remitente_id,
                mensaje
             )
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                conversacion.escuela_id,
                conversacion.grupo_id,
                alumnoId,
                conversacion.profesor_id,
                tipo,
                remitenteId,
                texto
            ]
        )

        return res.status(201).json({
            ok: true,
            mensaje: 'Mensaje enviado correctamente.',
            id: resultado.insertId
        })
    } catch (error) {
        console.error('Error al enviar mensaje privado:', error)

        return responderError(
            res,
            500,
            'No se pudo enviar el mensaje.'
        )
    }
}

async function enviarMensajeAlumno(req, res) {
    return enviarMensaje(req, res, 'ALUMNO')
}

async function enviarMensajeProfesor(req, res) {
    return enviarMensaje(req, res, 'PROFESOR')
}

// =====================================================
// REPORTAR MENSAJE
// El usuario solo puede reportar mensajes de la otra parte.
// =====================================================

async function reportarMensaje(req, res, tipo) {
    const mensajeId = obtenerIdPositivo(req.params.mensajeId)
    const motivo = validarTexto(req.body?.motivo)
    const comentario = validarTexto(req.body?.comentario)

    if (!mensajeId) {
        return responderError(res, 400, 'El mensaje no es válido.')
    }

    if (!motivo || motivo.length > 150) {
        return responderError(
            res,
            400,
            'Indica un motivo de hasta 150 caracteres.'
        )
    }

    if (comentario.length > 2000) {
        return responderError(
            res,
            400,
            'El comentario admite 2000 caracteres como máximo.'
        )
    }

    try {
        const [filas] = await db.execute(
            `SELECT
                mp.id,
                mp.escuela_id,
                mp.grupo_id,
                mp.alumno_id,
                mp.profesor_id,
                mp.remitente_tipo
             FROM mensajes_privados mp
             WHERE mp.id = ?
               AND mp.estado = 'VISIBLE'
             LIMIT 1`,
            [mensajeId]
        )

        const mensaje = filas[0]

        if (!mensaje) {
            return responderError(
                res,
                404,
                'El mensaje no existe o ya ha sido retirado.'
            )
        }

        // No se permite reportar un mensaje propio.
        if (mensaje.remitente_tipo === tipo) {
            return responderError(
                res,
                400,
                'Solo puedes reportar mensajes de la otra persona.'
            )
        }

        let conversacion

        if (tipo === 'ALUMNO') {
            conversacion = await obtenerConversacionAlumno(
                req.alumnoId,
                mensaje.grupo_id
            )

            if (
                !conversacion ||
                mensaje.alumno_id !== req.alumnoId ||
                mensaje.profesor_id !== conversacion.profesor_id ||
                mensaje.escuela_id !== conversacion.escuela_id
            ) {
                conversacion = null
            }
        } else {
            conversacion = await obtenerConversacionProfesor(
                req.profesor.id,
                req.profesor.escuelaId,
                mensaje.grupo_id,
                mensaje.alumno_id
            )

            if (
                !conversacion ||
                mensaje.profesor_id !== req.profesor.id ||
                mensaje.escuela_id !== req.profesor.escuelaId
            ) {
                conversacion = null
            }
        }

        if (!conversacion) {
            return responderError(
                res,
                403,
                'No tienes permiso para reportar este mensaje.'
            )
        }

        const reportanteId = tipo === 'ALUMNO'
            ? req.alumnoId
            : req.profesor.id

        const [resultado] = await db.execute(
            `INSERT INTO reportes_mensajes (
                mensaje_id,
                reportante_tipo,
                reportante_id,
                motivo,
                comentario
             )
             VALUES (?, ?, ?, ?, ?)`,
            [
                mensajeId,
                tipo,
                reportanteId,
                motivo,
                comentario || null
            ]
        )

        return res.status(201).json({
            ok: true,
            mensaje: 'El reporte se ha enviado para revisión.',
            id: resultado.insertId
        })
    } catch (error) {
        console.error('Error al reportar mensaje:', error)

        return responderError(
            res,
            500,
            'No se pudo enviar el reporte.'
        )
    }
}

async function reportarMensajeAlumno(req, res) {
    return reportarMensaje(req, res, 'ALUMNO')
}

async function reportarMensajeProfesor(req, res) {
    return reportarMensaje(req, res, 'PROFESOR')
}

module.exports = {
    listarGruposAlumno,
    listarGruposProfesor,
    listarAlumnosGrupoProfesor,
    leerMensajesAlumno,
    leerMensajesProfesor,
    enviarMensajeAlumno,
    enviarMensajeProfesor,
    reportarMensajeAlumno,
    reportarMensajeProfesor
}