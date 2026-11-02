
const db = require('../config/database')

// =====================================================
// VALIDACIONES COMUNES
// =====================================================

function responderError(res, status, mensaje) {
    return res.status(status).json({ ok: false, mensaje })
}

function obtenerIdPositivo(valor) {
    const id = Number(valor)
    return Number.isSafeInteger(id) && id > 0 ? id : null
}

function validarTexto(valor) {
    return typeof valor === 'string' ? valor.trim() : ''
}

// =====================================================
// GRUPOS Y PERMISOS
// =====================================================

async function obtenerGrupoAlumno(alumnoId, grupoId) {
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

async function obtenerGrupoProfesor(
    profesorId,
    escuelaId,
    grupoId
) {
    const [filas] = await db.execute(
        `SELECT
            g.id AS grupo_id,
            g.escuela_id,
            g.profesor_id
         FROM grupos g
         INNER JOIN escuelas e ON e.id = g.escuela_id
         INNER JOIN profesores p ON p.id = g.profesor_id
         WHERE g.id = ?
           AND g.profesor_id = ?
           AND g.escuela_id = ?
           AND g.activo = 1
           AND e.activa = 1
           AND p.activo = 1
         LIMIT 1`,
        [grupoId, profesorId, escuelaId]
    )

    return filas[0] || null
}

async function obtenerAlumnoEnGrupo(grupoId, alumnoId) {
    const [filas] = await db.execute(
        `SELECT a.id AS alumno_id
         FROM matriculas m
         INNER JOIN alumnos a ON a.id = m.alumno_id
         WHERE m.grupo_id = ?
           AND m.alumno_id = ?
           AND m.estado = 'ACTIVA'
           AND a.activo = 1
         LIMIT 1`,
        [grupoId, alumnoId]
    )

    return filas[0] || null
}

// =====================================================
// CREAR O RECUPERAR CONVERSACIÓN
// Orden estable de participantes para evitar duplicados.
// =====================================================

function ordenarParticipantes(participantes) {
    return [...participantes].sort((a, b) => {
        if (a.tipo !== b.tipo) {
            return a.tipo === 'ALUMNO' ? -1 : 1
        }

        return a.id - b.id
    })
}

async function obtenerOCrearConversacion(
    conexion,
    escuelaId,
    grupoId,
    tipoConversacion,
    participantes
) {
    const ordenados = ordenarParticipantes(participantes)

    const [resultado] = await conexion.execute(
        `INSERT INTO conversaciones_privadas (
            escuela_id,
            grupo_id,
            tipo_conversacion,
            participante1_tipo,
            participante1_id,
            participante2_tipo,
            participante2_id
         )
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
            id = LAST_INSERT_ID(id)`,
        [
            escuelaId,
            grupoId,
            tipoConversacion,
            ordenados[0].tipo,
            ordenados[0].id,
            ordenados[1].tipo,
            ordenados[1].id
        ]
    )

    return resultado.insertId
}

// =====================================================
// VALIDAR ACCESO A CONVERSACIÓN
// =====================================================

async function obtenerConversacionAccesibleAlumno(
    alumnoId,
    conversacionId
) {
    const [filas] = await db.execute(
        `SELECT cp.*
         FROM conversaciones_privadas cp
         INNER JOIN grupos g
            ON g.id = cp.grupo_id
           AND g.escuela_id = cp.escuela_id
         INNER JOIN escuelas e
            ON e.id = cp.escuela_id
         INNER JOIN matriculas m
            ON m.grupo_id = cp.grupo_id
           AND m.alumno_id = ?
           AND m.estado = 'ACTIVA'
         INNER JOIN alumnos a
            ON a.id = m.alumno_id
           AND a.activo = 1
         WHERE cp.id = ?
           AND g.activo = 1
           AND e.activa = 1
           AND (
                (
                    cp.tipo_conversacion = 'ALUMNO_PROFESOR'
                    AND cp.participante1_tipo = 'ALUMNO'
                    AND cp.participante1_id = ?
                    AND cp.participante2_tipo = 'PROFESOR'
                    AND g.profesor_id = cp.participante2_id
                )
                OR
                (
                    cp.tipo_conversacion = 'ALUMNO_ALUMNO'
                    AND cp.participante1_tipo = 'ALUMNO'
                    AND cp.participante2_tipo = 'ALUMNO'
                    AND (
                        (cp.participante1_id = ? AND EXISTS (
                            SELECT 1
                            FROM matriculas m2
                            INNER JOIN alumnos a2
                                ON a2.id = m2.alumno_id
                            WHERE m2.grupo_id = cp.grupo_id
                              AND m2.alumno_id = cp.participante2_id
                              AND m2.estado = 'ACTIVA'
                              AND a2.activo = 1
                        ))
                        OR
                        (cp.participante2_id = ? AND EXISTS (
                            SELECT 1
                            FROM matriculas m2
                            INNER JOIN alumnos a2
                                ON a2.id = m2.alumno_id
                            WHERE m2.grupo_id = cp.grupo_id
                              AND m2.alumno_id = cp.participante1_id
                              AND m2.estado = 'ACTIVA'
                              AND a2.activo = 1
                        ))
                    )
                )
           )
         LIMIT 1`,
        [
            alumnoId,
            conversacionId,
            alumnoId,
            alumnoId,
            alumnoId
        ]
    )

    return filas[0] || null
}

async function obtenerConversacionAccesibleProfesor(
    profesorId,
    escuelaId,
    conversacionId
) {
    const [filas] = await db.execute(
        `SELECT cp.*
         FROM conversaciones_privadas cp
         INNER JOIN grupos g
            ON g.id = cp.grupo_id
           AND g.escuela_id = cp.escuela_id
         INNER JOIN escuelas e
            ON e.id = cp.escuela_id
         INNER JOIN matriculas m
            ON m.grupo_id = cp.grupo_id
           AND m.alumno_id = cp.participante1_id
           AND m.estado = 'ACTIVA'
         INNER JOIN alumnos a
            ON a.id = m.alumno_id
           AND a.activo = 1
         WHERE cp.id = ?
           AND cp.tipo_conversacion = 'ALUMNO_PROFESOR'
           AND cp.participante1_tipo = 'ALUMNO'
           AND cp.participante2_tipo = 'PROFESOR'
           AND cp.participante2_id = ?
           AND g.profesor_id = ?
           AND cp.escuela_id = ?
           AND g.activo = 1
           AND e.activa = 1
         LIMIT 1`,
        [
            conversacionId,
            profesorId,
            profesorId,
            escuelaId
        ]
    )

    return filas[0] || null
}

// =====================================================
// LISTAR GRUPOS DEL ALUMNO
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

        return res.json({ ok: true, grupos })
    } catch (error) {
        console.error('Error al listar grupos del alumno:', error)
        return responderError(res, 500, 'No se pudieron cargar tus grupos.')
    }
}

// =====================================================
// LISTAR COMPAÑEROS DEL ALUMNO
// Solo alumnos activos del mismo grupo.
// =====================================================

async function listarCompanerosAlumno(req, res) {
    const grupoId = obtenerIdPositivo(req.params.grupoId)

    if (!grupoId) {
        return responderError(res, 400, 'El grupo no es válido.')
    }

    try {
        const grupo = await obtenerGrupoAlumno(req.alumnoId, grupoId)

        if (!grupo) {
            return responderError(res, 403, 'No tienes acceso a este grupo.')
        }

        const [alumnos] = await db.execute(
            `SELECT
                a.id AS alumno_id,
                a.nombre,
                a.apellidos
             FROM matriculas m
             INNER JOIN alumnos a ON a.id = m.alumno_id
             WHERE m.grupo_id = ?
               AND m.estado = 'ACTIVA'
               AND a.activo = 1
               AND a.id <> ?
             ORDER BY a.apellidos, a.nombre`,
            [grupoId, req.alumnoId]
        )

        return res.json({ ok: true, alumnos })
    } catch (error) {
        console.error('Error al listar compañeros:', error)
        return responderError(res, 500, 'No se pudieron cargar tus compañeros.')
    }
}

// =====================================================
// GRUPOS DEL PROFESOR
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
             GROUP BY g.id, g.nombre, g.escuela_id,
                      e.nombre, c.nombre
             ORDER BY c.nombre, g.nombre`,
            [req.profesor.id, req.profesor.escuelaId]
        )

        return res.json({ ok: true, grupos })
    } catch (error) {
        console.error('Error al listar grupos del profesor:', error)
        return responderError(res, 500, 'No se pudieron cargar tus grupos.')
    }
}

// =====================================================
// ALUMNOS DEL GRUPO DEL PROFESOR
// =====================================================

async function listarAlumnosGrupoProfesor(req, res) {
    const grupoId = obtenerIdPositivo(req.params.grupoId)

    if (!grupoId) {
        return responderError(res, 400, 'El grupo no es válido.')
    }

    try {
        const grupo = await obtenerGrupoProfesor(
            req.profesor.id,
            req.profesor.escuelaId,
            grupoId
        )

        if (!grupo) {
            return responderError(res, 403, 'No tienes permiso para consultar este grupo.')
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

        return res.json({ ok: true, alumnos })
    } catch (error) {
        console.error('Error al listar alumnos del grupo:', error)
        return responderError(res, 500, 'No se pudieron cargar los alumnos del grupo.')
    }
}

// =====================================================
// CREAR O RECUPERAR CONVERSACIÓN ALUMNO-PROFESOR
// =====================================================

async function prepararConversacionAlumnoProfesor(
    alumnoId,
    grupoId
) {
    const grupo = await obtenerGrupoAlumno(alumnoId, grupoId)

    if (!grupo) return null

    const conexion = await db.getConnection()

    try {
        await conexion.beginTransaction()

        const conversacionId = await obtenerOCrearConversacion(
            conexion,
            grupo.escuela_id,
            grupo.grupo_id,
            'ALUMNO_PROFESOR',
            [
                { tipo: 'ALUMNO', id: alumnoId },
                { tipo: 'PROFESOR', id: grupo.profesor_id }
            ]
        )

        await conexion.commit()

        return {
            ...grupo,
            conversacion_id: conversacionId,
            alumno_id: alumnoId
        }
    } catch (error) {
        await conexion.rollback()
        throw error
    } finally {
        conexion.release()
    }
}

// =====================================================
// CREAR O RECUPERAR CONVERSACIÓN ALUMNO-ALUMNO
// =====================================================

async function prepararConversacionAlumnoAlumno(
    alumnoId,
    grupoId,
    companeroId
) {
    if (alumnoId === companeroId) return null

    const grupo = await obtenerGrupoAlumno(alumnoId, grupoId)

    if (!grupo) return null

    const companero = await obtenerAlumnoEnGrupo(grupoId, companeroId)

    if (!companero) return null

    const conexion = await db.getConnection()

    try {
        await conexion.beginTransaction()

        const conversacionId = await obtenerOCrearConversacion(
            conexion,
            grupo.escuela_id,
            grupo.grupo_id,
            'ALUMNO_ALUMNO',
            [
                { tipo: 'ALUMNO', id: alumnoId },
                { tipo: 'ALUMNO', id: companeroId }
            ]
        )

        await conexion.commit()

        return {
            ...grupo,
            conversacion_id: conversacionId,
            alumno_id: alumnoId,
            companero_id: companeroId
        }
    } catch (error) {
        await conexion.rollback()
        throw error
    } finally {
        conexion.release()
    }
}

// =====================================================
// LEER MENSAJES DE UNA CONVERSACIÓN
// =====================================================

async function devolverMensajes(res, conversacionId) {
    const [mensajes] = await db.execute(
        `SELECT
            id,
            conversacion_id,
            remitente_tipo,
            remitente_id,
            mensaje,
            fecha_envio
         FROM mensajes_privados
         WHERE conversacion_id = ?
           AND estado = 'VISIBLE'
         ORDER BY fecha_envio ASC, id ASC`,
        [conversacionId]
    )

    return res.json({ ok: true, mensajes })
}

async function leerMensajesAlumno(req, res) {
    const grupoId = obtenerIdPositivo(req.params.grupoId)

    if (!grupoId) {
        return responderError(res, 400, 'El grupo no es válido.')
    }

    try {
        const conversacion = await prepararConversacionAlumnoProfesor(
            req.alumnoId,
            grupoId
        )

        if (!conversacion) {
            return responderError(res, 403, 'No tienes permiso para consultar esta conversación.')
        }

        return devolverMensajes(res, conversacion.conversacion_id)
    } catch (error) {
        console.error('Error al leer mensajes del alumno:', error)
        return responderError(res, 500, 'No se pudieron cargar los mensajes.')
    }
}

async function leerMensajesProfesor(req, res) {
    const grupoId = obtenerIdPositivo(req.params.grupoId)
    const alumnoId = obtenerIdPositivo(req.params.alumnoId)

    if (!grupoId || !alumnoId) {
        return responderError(res, 400, 'El grupo o el alumno no son válidos.')
    }

    try {
        const grupo = await obtenerGrupoProfesor(
            req.profesor.id,
            req.profesor.escuelaId,
            grupoId
        )

        const alumno = await obtenerAlumnoEnGrupo(grupoId, alumnoId)

        if (!grupo || !alumno) {
            return responderError(res, 403, 'No tienes permiso para consultar esta conversación.')
        }

        const conexion = await db.getConnection()
        let conversacionId

        try {
            await conexion.beginTransaction()

            conversacionId = await obtenerOCrearConversacion(
                conexion,
                grupo.escuela_id,
                grupo.grupo_id,
                'ALUMNO_PROFESOR',
                [
                    { tipo: 'ALUMNO', id: alumnoId },
                    { tipo: 'PROFESOR', id: req.profesor.id }
                ]
            )

            await conexion.commit()
        } catch (error) {
            await conexion.rollback()
            throw error
        } finally {
            conexion.release()
        }

        return devolverMensajes(res, conversacionId)
    } catch (error) {
        console.error('Error al leer mensajes del profesor:', error)
        return responderError(res, 500, 'No se pudieron cargar los mensajes.')
    }
}

async function leerMensajesCompaneroAlumno(req, res) {
    const grupoId = obtenerIdPositivo(req.params.grupoId)
    const companeroId = obtenerIdPositivo(req.params.alumnoId)

    if (!grupoId || !companeroId) {
        return responderError(res, 400, 'El grupo o el compañero no son válidos.')
    }

    try {
        const conversacion = await prepararConversacionAlumnoAlumno(
            req.alumnoId,
            grupoId,
            companeroId
        )

        if (!conversacion) {
            return responderError(res, 403, 'No tienes permiso para consultar esta conversación.')
        }

        return devolverMensajes(res, conversacion.conversacion_id)
    } catch (error) {
        console.error('Error al leer conversación entre alumnos:', error)
        return responderError(res, 500, 'No se pudieron cargar los mensajes.')
    }
}

// =====================================================
// ENVIAR MENSAJES
// =====================================================

async function insertarMensaje({
    conversacionId,
    escuelaId,
    grupoId,
    alumnoId,
    profesorId,
    remitenteTipo,
    remitenteId,
    texto
}) {
    const [resultado] = await db.execute(
        `INSERT INTO mensajes_privados (
            conversacion_id,
            escuela_id,
            grupo_id,
            alumno_id,
            profesor_id,
            remitente_tipo,
            remitente_id,
            mensaje
         )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            conversacionId,
            escuelaId,
            grupoId,
            alumnoId,
            profesorId,
            remitenteTipo,
            remitenteId,
            texto
        ]
    )

    return resultado.insertId
}

async function validarTextoMensaje(req, res) {
    const texto = validarTexto(req.body?.mensaje)

    if (!texto) {
        responderError(res, 400, 'Escribe un mensaje.')
        return null
    }

    if (texto.length > 3000) {
        responderError(res, 400, 'El mensaje admite 3000 caracteres como máximo.')
        return null
    }

    return texto
}

async function enviarMensajeAlumno(req, res) {
    const grupoId = obtenerIdPositivo(req.params.grupoId)
    const texto = await validarTextoMensaje(req, res)

    if (!grupoId) {
        return responderError(res, 400, 'El grupo no es válido.')
    }

    if (!texto) return

    try {
        const conversacion = await prepararConversacionAlumnoProfesor(
            req.alumnoId,
            grupoId
        )

        if (!conversacion) {
            return responderError(res, 403, 'No tienes permiso para escribir en esta conversación.')
        }

        const id = await insertarMensaje({
            conversacionId: conversacion.conversacion_id,
            escuelaId: conversacion.escuela_id,
            grupoId,
            alumnoId: req.alumnoId,
            profesorId: conversacion.profesor_id,
            remitenteTipo: 'ALUMNO',
            remitenteId: req.alumnoId,
            texto
        })

        return res.status(201).json({
            ok: true,
            mensaje: 'Mensaje enviado correctamente.',
            id
        })
    } catch (error) {
        console.error('Error al enviar mensaje del alumno:', error)
        return responderError(res, 500, 'No se pudo enviar el mensaje.')
    }
}

async function enviarMensajeProfesor(req, res) {
    const grupoId = obtenerIdPositivo(req.params.grupoId)
    const alumnoId = obtenerIdPositivo(req.params.alumnoId)
    const texto = await validarTextoMensaje(req, res)

    if (!grupoId || !alumnoId) {
        return responderError(res, 400, 'El grupo o el alumno no son válidos.')
    }

    if (!texto) return

    try {
        const grupo = await obtenerGrupoProfesor(
            req.profesor.id,
            req.profesor.escuelaId,
            grupoId
        )

        const alumno = await obtenerAlumnoEnGrupo(grupoId, alumnoId)

        if (!grupo || !alumno) {
            return responderError(res, 403, 'No tienes permiso para escribir en esta conversación.')
        }

        const conexion = await db.getConnection()
        let conversacionId

        try {
            await conexion.beginTransaction()

            conversacionId = await obtenerOCrearConversacion(
                conexion,
                grupo.escuela_id,
                grupoId,
                'ALUMNO_PROFESOR',
                [
                    { tipo: 'ALUMNO', id: alumnoId },
                    { tipo: 'PROFESOR', id: req.profesor.id }
                ]
            )

            await conexion.execute(
                `INSERT INTO mensajes_privados (
                    conversacion_id,
                    escuela_id,
                    grupo_id,
                    alumno_id,
                    profesor_id,
                    remitente_tipo,
                    remitente_id,
                    mensaje
                 )
                 VALUES (?, ?, ?, ?, ?, 'PROFESOR', ?, ?)`,
                [
                    conversacionId,
                    grupo.escuela_id,
                    grupoId,
                    alumnoId,
                    req.profesor.id,
                    req.profesor.id,
                    texto
                ]
            )

            await conexion.commit()
        } catch (error) {
            await conexion.rollback()
            throw error
        } finally {
            conexion.release()
        }

        return res.status(201).json({
            ok: true,
            mensaje: 'Mensaje enviado correctamente.'
        })
    } catch (error) {
        console.error('Error al enviar mensaje del profesor:', error)
        return responderError(res, 500, 'No se pudo enviar el mensaje.')
    }
}

async function enviarMensajeCompaneroAlumno(req, res) {
    const grupoId = obtenerIdPositivo(req.params.grupoId)
    const companeroId = obtenerIdPositivo(req.params.alumnoId)
    const texto = await validarTextoMensaje(req, res)

    if (!grupoId || !companeroId) {
        return responderError(res, 400, 'El grupo o el compañero no son válidos.')
    }

    if (!texto) return

    try {
        const conversacion = await prepararConversacionAlumnoAlumno(
            req.alumnoId,
            grupoId,
            companeroId
        )

        if (!conversacion) {
            return responderError(res, 403, 'No tienes permiso para escribir en esta conversación.')
        }

        const id = await insertarMensaje({
            conversacionId: conversacion.conversacion_id,
            escuelaId: conversacion.escuela_id,
            grupoId,
            alumnoId: Math.min(req.alumnoId, companeroId),
            profesorId: null,
            remitenteTipo: 'ALUMNO',
            remitenteId: req.alumnoId,
            texto
        })

        return res.status(201).json({
            ok: true,
            mensaje: 'Mensaje enviado correctamente.',
            id
        })
    } catch (error) {
        console.error('Error al enviar mensaje entre alumnos:', error)
        return responderError(res, 500, 'No se pudo enviar el mensaje.')
    }
}

// =====================================================
// REPORTAR MENSAJE
// Solo se puede reportar un mensaje ajeno de una
// conversación en la que el usuario participa.
// =====================================================

async function reportarMensaje(req, res, tipo) {
    const mensajeId = obtenerIdPositivo(req.params.mensajeId)
    const motivo = validarTexto(req.body?.motivo)
    const comentario = validarTexto(req.body?.comentario)

    if (!mensajeId) {
        return responderError(res, 400, 'El mensaje no es válido.')
    }

    if (!motivo || motivo.length > 150) {
        return responderError(res, 400, 'Indica un motivo de hasta 150 caracteres.')
    }

    if (comentario.length > 2000) {
        return responderError(res, 400, 'El comentario admite 2000 caracteres como máximo.')
    }

    try {
        const [filas] = await db.execute(
            `SELECT
                id,
                conversacion_id,
                remitente_tipo,
                remitente_id
             FROM mensajes_privados
             WHERE id = ?
               AND estado = 'VISIBLE'
             LIMIT 1`,
            [mensajeId]
        )

        const mensaje = filas[0]

        if (!mensaje) {
            return responderError(res, 404, 'El mensaje no existe o ya ha sido retirado.')
        }

        const usuarioId = tipo === 'ALUMNO'
            ? req.alumnoId
            : req.profesor.id

        if (
            mensaje.remitente_tipo === tipo &&
            mensaje.remitente_id === usuarioId
        ) {
            return responderError(res, 400, 'No puedes reportar un mensaje propio.')
        }

        let conversacion

        if (tipo === 'ALUMNO') {
            conversacion = await obtenerConversacionAccesibleAlumno(
                usuarioId,
                mensaje.conversacion_id
            )
        } else {
            conversacion = await obtenerConversacionAccesibleProfesor(
                usuarioId,
                req.profesor.escuelaId,
                mensaje.conversacion_id
            )
        }

        if (!conversacion) {
            return responderError(res, 403, 'No tienes permiso para reportar este mensaje.')
        }

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
                usuarioId,
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
        return responderError(res, 500, 'No se pudo enviar el reporte.')
    }
}

async function reportarMensajeAlumno(req, res) {
    return reportarMensaje(req, res, 'ALUMNO')
}

async function reportarMensajeProfesor(req, res) {
    return reportarMensaje(req, res, 'PROFESOR')
}

// =====================================================
// EXPORTACIONES
// =====================================================

module.exports = {
    listarGruposAlumno,
    listarCompanerosAlumno,
    listarGruposProfesor,
    listarAlumnosGrupoProfesor,

    leerMensajesAlumno,
    leerMensajesProfesor,
    leerMensajesCompaneroAlumno,

    enviarMensajeAlumno,
    enviarMensajeProfesor,
    enviarMensajeCompaneroAlumno,

    reportarMensajeAlumno,
    reportarMensajeProfesor
}
