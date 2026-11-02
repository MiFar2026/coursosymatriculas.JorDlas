
const db = require('../config/database')
const PDFDocument = require('pdfkit')
// =====================================================
// LISTAR REPORTES Y CONTEXTO DE LA CONVERSACIÓN
// Solo aparecen conversaciones con mensajes denunciados.
// Para cada reporte se muestran los mensajes de ese día.
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

        mp.conversacion_id,
        mp.escuela_id,
        mp.grupo_id,
        mp.alumno_id,
        mp.profesor_id,
        mp.remitente_tipo,
        mp.remitente_id,
        mp.mensaje,
        mp.fecha_envio,
        mp.estado AS estado_mensaje,

        cp.tipo_conversacion,

        e.nombre AS escuela_nombre,
        g.nombre AS grupo_nombre,

        cp.participante1_tipo,
        cp.participante1_id,
        cp.participante2_tipo,
        cp.participante2_id,

        a1.nombre AS participante1_alumno_nombre,
        a1.apellidos AS participante1_alumno_apellidos,

        p1.nombre AS participante1_profesor_nombre,
        p1.apellidos AS participante1_profesor_apellidos,

        a2.nombre AS participante2_alumno_nombre,
        a2.apellidos AS participante2_alumno_apellidos,

        p2.nombre AS participante2_profesor_nombre,
        p2.apellidos AS participante2_profesor_apellidos,

        COALESCE(a1.nombre, a2.nombre) AS alumno_nombre,
        COALESCE(a1.apellidos, a2.apellidos) AS alumno_apellidos,

        COALESCE(p1.nombre, p2.nombre) AS profesor_nombre,
        COALESCE(p1.apellidos, p2.apellidos) AS profesor_apellidos

     FROM reportes_mensajes r

     INNER JOIN mensajes_privados mp
        ON mp.id = r.mensaje_id

     INNER JOIN conversaciones_privadas cp
        ON cp.id = mp.conversacion_id

     INNER JOIN escuelas e
        ON e.id = mp.escuela_id

     INNER JOIN grupos g
        ON g.id = mp.grupo_id

     LEFT JOIN alumnos a1
        ON a1.id = cp.participante1_id
       AND cp.participante1_tipo = 'ALUMNO'

     LEFT JOIN profesores p1
        ON p1.id = cp.participante1_id
       AND cp.participante1_tipo = 'PROFESOR'

     LEFT JOIN alumnos a2
        ON a2.id = cp.participante2_id
       AND cp.participante2_tipo = 'ALUMNO'

     LEFT JOIN profesores p2
        ON p2.id = cp.participante2_id
       AND cp.participante2_tipo = 'PROFESOR'

     ORDER BY
        CASE WHEN r.estado = 'PENDIENTE'
             THEN 0 ELSE 1 END,
        r.fecha_reporte DESC`,
    []
)

        // Recuperar el contexto del mismo día de cada denuncia.
        const resultado = []

        for (const reporte of reportes) {
            const [mensajes] = await db.execute(
                `SELECT
                    id,
                    conversacion_id,
                    remitente_tipo,
                    remitente_id,
                    mensaje,
                    fecha_envio,
                    estado
                 FROM mensajes_privados
                 WHERE conversacion_id = ?
                   AND DATE(fecha_envio) = DATE(?)
                 ORDER BY fecha_envio ASC, id ASC`,
                [
                    reporte.conversacion_id,
                    reporte.fecha_envio
                ]
            )

            resultado.push({
                ...reporte,
                mensajes_contexto: mensajes
            })
        }

        return res.json({
            ok: true,
            reportes: resultado
        })
    } catch (error) {
        console.error('Error al listar mensajes reportados:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se pudieron cargar los mensajes reportados.'
        })
    }
}

// =====================================================
// REVISAR UN REPORTE
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
// Conserva el texto original y los reportes.
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


// =====================================================
// DESCARGAR EXPEDIENTE PDF DE UNA DENUNCIA
// Incluye todos los mensajes de esa conversación
// durante el día del mensaje denunciado.
// No modifica mensajes ni estados de reportes.
// =====================================================

async function descargarExpedienteMensaje(req, res) {
    const reporteId = Number(req.params.reporteId)

    if (!Number.isSafeInteger(reporteId) || reporteId <= 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador del reporte no es válido.'
        })
    }

    try {
        const [reportes] = await db.execute(
            `SELECT
                r.id AS reporte_id,
                r.motivo,
                r.comentario AS comentario_reporte,
                r.estado AS estado_reporte,
                r.fecha_reporte,
                r.reportante_tipo,
                r.reportante_id,

                mp.id AS mensaje_id,
                mp.conversacion_id,
                mp.escuela_id,
                mp.grupo_id,
                mp.mensaje AS mensaje_denunciado,
                mp.fecha_envio,
                mp.estado AS estado_mensaje,
                mp.remitente_tipo,
                mp.remitente_id,

                cp.tipo_conversacion,
                cp.participante1_tipo,
                cp.participante1_id,
                cp.participante2_tipo,
                cp.participante2_id,

                e.nombre AS escuela_nombre,
                g.nombre AS grupo_nombre,

                a1.nombre AS participante1_alumno_nombre,
                a1.apellidos AS participante1_alumno_apellidos,
                p1.nombre AS participante1_profesor_nombre,
                p1.apellidos AS participante1_profesor_apellidos,

                a2.nombre AS participante2_alumno_nombre,
                a2.apellidos AS participante2_alumno_apellidos,
                p2.nombre AS participante2_profesor_nombre,
                p2.apellidos AS participante2_profesor_apellidos

             FROM reportes_mensajes r

             INNER JOIN mensajes_privados mp
                ON mp.id = r.mensaje_id

             INNER JOIN conversaciones_privadas cp
                ON cp.id = mp.conversacion_id

             INNER JOIN escuelas e
                ON e.id = mp.escuela_id

             INNER JOIN grupos g
                ON g.id = mp.grupo_id

             LEFT JOIN alumnos a1
                ON a1.id = cp.participante1_id
               AND cp.participante1_tipo = 'ALUMNO'

             LEFT JOIN profesores p1
                ON p1.id = cp.participante1_id
               AND cp.participante1_tipo = 'PROFESOR'

             LEFT JOIN alumnos a2
                ON a2.id = cp.participante2_id
               AND cp.participante2_tipo = 'ALUMNO'

             LEFT JOIN profesores p2
                ON p2.id = cp.participante2_id
               AND cp.participante2_tipo = 'PROFESOR'

             WHERE r.id = ?
             LIMIT 1`,
            [reporteId]
        )

        if (!reportes.length) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se ha encontrado la denuncia.'
            })
        }

        const reporte = reportes[0]

        // Recuperar todos los mensajes de ese día.
        // Se incluyen también los mensajes retirados.
        const [mensajes] = await db.execute(
            `SELECT
                id,
                remitente_tipo,
                remitente_id,
                mensaje,
                fecha_envio,
                estado
             FROM mensajes_privados
             WHERE conversacion_id = ?
               AND DATE(fecha_envio) = DATE(?)
             ORDER BY fecha_envio ASC, id ASC`,
            [
                reporte.conversacion_id,
                reporte.fecha_envio
            ]
        )

        function fechaLegible(fecha) {
            if (!fecha) return 'No disponible'

            return new Date(fecha).toLocaleString('es-ES', {
                timeZone: 'Europe/Madrid',
                dateStyle: 'short',
                timeStyle: 'medium'
            })
        }

        function nombreParticipante(tipo, id, alumnoNombre, alumnoApellidos, profesorNombre, profesorApellidos) {
            const nombre = tipo === 'ALUMNO'
                ? [alumnoNombre, alumnoApellidos].filter(Boolean).join(' ')
                : [profesorNombre, profesorApellidos].filter(Boolean).join(' ')

            return nombre || `${tipo} #${id}`
        }

        const participante1 = nombreParticipante(
            reporte.participante1_tipo,
            reporte.participante1_id,
            reporte.participante1_alumno_nombre,
            reporte.participante1_alumno_apellidos,
            reporte.participante1_profesor_nombre,
            reporte.participante1_profesor_apellidos
        )

        const participante2 = nombreParticipante(
            reporte.participante2_tipo,
            reporte.participante2_id,
            reporte.participante2_alumno_nombre,
            reporte.participante2_alumno_apellidos,
            reporte.participante2_profesor_nombre,
            reporte.participante2_profesor_apellidos
        )

        const documento = new PDFDocument({
            size: 'A4',
            margins: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            },
            info: {
                Title: `Expediente de mediación ${reporteId}`,
                Author: 'Administración ExAequo',
                Subject: 'Registro de denuncia y conversación privada'
            }
        })

        const nombreArchivo = `expediente-mediacion-${reporteId}.pdf`

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${nombreArchivo}"`
        )

        documento.pipe(res)

        documento
            .font('Helvetica-Bold')
            .fontSize(19)
            .text('EXAEQUO', { align: 'center' })

        documento
            .moveDown(0.4)
            .fontSize(15)
            .text('EXPEDIENTE DE MEDIACIÓN Y CONVIVENCIA', {
                align: 'center'
            })

        documento.moveDown(1.5)

        documento
            .fontSize(12)
            .text(`Número de expediente: ${reporte.reporte_id}`)

        documento.text(`Escuela: ${reporte.escuela_nombre}`)
        documento.text(`Grupo: ${reporte.grupo_nombre}`)
        documento.text(`Tipo de conversación: ${reporte.tipo_conversacion}`)
        documento.text(`Participante 1: ${participante1} (${reporte.participante1_tipo})`)
        documento.text(`Participante 2: ${participante2} (${reporte.participante2_tipo})`)

        documento.moveDown()

        documento
            .font('Helvetica-Bold')
            .text('1. DATOS DE LA DENUNCIA')

        documento
            .font('Helvetica')
            .text(`Fecha de la denuncia: ${fechaLegible(reporte.fecha_reporte)}`)
            .text(`Estado de la denuncia: ${reporte.estado_reporte}`)
            .text(`Persona que denuncia: ${reporte.reportante_tipo} #${reporte.reportante_id}`)
            .text(`Motivo: ${reporte.motivo}`)
            .text(`Comentario: ${reporte.comentario_reporte || 'Sin comentario'}`)

        documento.moveDown()

        documento
            .font('Helvetica-Bold')
            .text('2. MENSAJE DENUNCIADO')

        documento
            .font('Helvetica')
            .text(`Identificador: ${reporte.mensaje_id}`)
            .text(`Remitente: ${reporte.remitente_tipo} #${reporte.remitente_id}`)
            .text(`Fecha: ${fechaLegible(reporte.fecha_envio)}`)
            .text(`Estado: ${reporte.estado_mensaje}`)
            .text('Contenido:')
            .text(reporte.mensaje_denunciado || 'Sin texto', {
                indent: 15
            })

        documento.moveDown()

        documento
            .font('Helvetica-Bold')
            .text('3. CONTEXTO DE LA CONVERSACIÓN')

        documento
            .font('Helvetica')
            .text(`Mensajes registrados ese día: ${mensajes.length}`)

        documento.moveDown(0.5)

        for (const mensaje of mensajes) {
            documento
                .font('Helvetica-Bold')
                .fontSize(10)
                .text(
                    `${mensaje.remitente_tipo} #${mensaje.remitente_id} - ${fechaLegible(mensaje.fecha_envio)}`
                )

            documento
                .font('Helvetica')
                .fontSize(10)
                .text(`Estado: ${mensaje.estado}`)

            documento.text(mensaje.mensaje || 'Sin texto', {
                indent: 12
            })

            documento.moveDown(0.8)
        }

        documento.moveDown()

        documento
            .font('Helvetica-Bold')
            .fontSize(11)
            .text('4. OBSERVACIONES DE ADMINISTRACIÓN')

        documento
            .font('Helvetica')
            .fontSize(10)
            .text('Espacio reservado para las observaciones y actuaciones administrativas.')

        documento.moveDown(2)

        documento
            .fontSize(9)
            .fillColor('gray')
            .text(
                'Documento generado por el sistema de administración ExAequo. La descarga no modifica los mensajes ni el estado de la denuncia.',
                { align: 'center' }
            )

        documento.end()

    } catch (error) {
        console.error('Error al generar expediente PDF:', error)

        if (!res.headersSent) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se pudo generar el expediente PDF.'
            })
        }

        res.destroy(error)
    }
}


module.exports = {
    listarMensajesReportados,
    revisarReporteMensaje,
    retirarMensajeReportado,
    descargarExpedienteMensaje
}
