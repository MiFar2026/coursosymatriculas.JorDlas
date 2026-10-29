const db = require('../config/database')

// =====================================================
// LISTAR SOLO LOS MENSAJES REPORTADOS
// No muestra conversaciones sin reportes.
// =====================================================

async function listarMensajesReportados(req, res) {
    try {
        const [reportes] = await db.execute(
            `SELECT
                r.id AS reporte_id,
                r.mensaje_id,
                r.reportante_tipo,
                r.reportante_id,
                r.motivo,
                r.comentario AS comentario_reporte,
                r.estado AS estado_reporte,
                r.fecha_reporte,

                mp.escuela_id,
                mp.grupo_id,
                mp.alumno_id,
                mp.profesor_id,
                mp.remitente_tipo,
                mp.remitente_id,
                mp.mensaje,
                mp.fecha_envio,
                mp.estado AS estado_mensaje,

                e.nombre AS escuela_nombre,
                g.nombre AS grupo_nombre,
                a.nombre AS alumno_nombre,
                a.apellidos AS alumno_apellidos,
                p.nombre AS profesor_nombre,
                p.apellidos AS profesor_apellidos

             FROM reportes_mensajes r
             INNER JOIN mensajes_privados mp
                ON mp.id = r.mensaje_id
             INNER JOIN escuelas e
                ON e.id = mp.escuela_id
             INNER JOIN grupos g
                ON g.id = mp.grupo_id
             INNER JOIN alumnos a
                ON a.id = mp.alumno_id
             INNER JOIN profesores p
                ON p.id = mp.profesor_id

             ORDER BY
                CASE WHEN r.estado = 'PENDIENTE'
                     THEN 0 ELSE 1 END,
                r.fecha_reporte DESC`,
            []
        )

        return res.json({
            ok: true,
            reportes
        })
    } catch (error) {
        console.error(
            'Error al listar mensajes reportados:',
            error
        )

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudieron cargar los mensajes reportados.'
        })
    }
}

// =====================================================
// REVISAR UN REPORTE
// No modifica el texto original ni lo retira.
// =====================================================

async function revisarReporteMensaje(req, res) {
    const reporteId = Number(req.params.reporteId)
    const detalle = typeof req.body?.detalle === 'string'
        ? req.body.detalle.trim()
        : ''

    if (!Number.isSafeInteger(reporteId) || reporteId <= 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El reporte no es válido.'
        })
    }

    if (detalle.length > 1000) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El detalle admite 1000 caracteres como máximo.'
        })
    }

    const conexion = await db.getConnection()

    try {
        await conexion.beginTransaction()

        const [reportes] = await conexion.execute(
            `SELECT id, mensaje_id, estado
             FROM reportes_mensajes
             WHERE id = ?
             FOR UPDATE`,
            [reporteId]
        )

        if (!reportes.length) {
            await conexion.rollback()

            return res.status(404).json({
                ok: false,
                mensaje: 'El reporte no existe.'
            })
        }

        const reporte = reportes[0]

        if (reporte.estado === 'RETIRADO') {
            await conexion.rollback()

            return res.status(409).json({
                ok: false,
                mensaje: 'Este reporte ya corresponde a un mensaje retirado.'
            })
        }

        await conexion.execute(
            `UPDATE reportes_mensajes
             SET estado = 'REVISADO',
                 fecha_revision = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [reporteId]
        )

        await conexion.execute(
    `INSERT INTO mensajes_moderacion_auditoria (
        mensaje_id,
        reporte_id,
        accion,
        administrador_id,
        administrador_usuario,
        detalle
    )
    VALUES (?, ?, 'REVISION', NULL, ?, ?)`,
    [
        reporte.mensaje_id,
        reporteId,
        req.admin.usuario,
        detalle || null
    ]
)

        await conexion.commit()

        return res.json({
            ok: true,
            mensaje: 'El reporte se ha marcado como revisado.'
        })
    } catch (error) {
        await conexion.rollback()

        console.error('Error al revisar reporte:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo revisar el reporte.'
        })
    } finally {
        conexion.release()
    }
}

// =====================================================
// RETIRAR MENSAJE REPORTADO
// Conserva el texto original y todos los reportes.
// =====================================================

async function retirarMensajeReportado(req, res) {
    const reporteId = Number(req.params.reporteId)
    const detalle = typeof req.body?.detalle === 'string'
        ? req.body.detalle.trim()
        : ''

    if (!Number.isSafeInteger(reporteId) || reporteId <= 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El reporte no es válido.'
        })
    }

    if (!detalle) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Indica el motivo de la decisión administrativa.'
        })
    }

    if (detalle.length > 1000) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El detalle admite 1000 caracteres como máximo.'
        })
    }

    const conexion = await db.getConnection()

    try {
        await conexion.beginTransaction()

        const [reportes] = await conexion.execute(
            `SELECT id, mensaje_id, estado
             FROM reportes_mensajes
             WHERE id = ?
             FOR UPDATE`,
            [reporteId]
        )

        if (!reportes.length) {
            await conexion.rollback()

            return res.status(404).json({
                ok: false,
                mensaje: 'El reporte no existe.'
            })
        }

        const reporte = reportes[0]

        const [mensajes] = await conexion.execute(
            `SELECT id, estado
             FROM mensajes_privados
             WHERE id = ?
             FOR UPDATE`,
            [reporte.mensaje_id]
        )

        if (!mensajes.length) {
            await conexion.rollback()

            return res.status(404).json({
                ok: false,
                mensaje: 'El mensaje asociado al reporte no existe.'
            })
        }

        await conexion.execute(
            `UPDATE mensajes_privados
             SET estado = 'RETIRADO'
             WHERE id = ?`,
            [reporte.mensaje_id]
        )

        await conexion.execute(
            `UPDATE reportes_mensajes
             SET estado = 'RETIRADO',
                 fecha_revision = CURRENT_TIMESTAMP
             WHERE mensaje_id = ?`,
            [reporte.mensaje_id]
        )

  await conexion.execute(
    `INSERT INTO mensajes_moderacion_auditoria (
        mensaje_id,
        reporte_id,
        accion,
        administrador_id,
        administrador_usuario,
        detalle
    )
    VALUES (?, ?, 'RETIRADA', NULL, ?, ?)`,
    [
        reporte.mensaje_id,
        reporteId,
        req.admin.usuario,
        detalle
    ]
)

        await conexion.commit()

        return res.json({
            ok: true,
            mensaje: 'El mensaje se ha retirado y la decisión ha quedado registrada.'
        })
    } catch (error) {
        await conexion.rollback()

        console.error('Error al retirar mensaje reportado:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudo retirar el mensaje.'
        })
    } finally {
        conexion.release()
    }
}

module.exports = {
    listarMensajesReportados,
    revisarReporteMensaje,
    retirarMensajeReportado
}