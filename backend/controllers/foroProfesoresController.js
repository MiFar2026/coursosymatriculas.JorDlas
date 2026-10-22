
const ForoProfesores = require('../model/collections/foroProfesoresModel')

// Solo profesores autenticados pueden consultar el foro.
const getMensajes = async (req, res) => {
    try {
        const autorizado = await ForoProfesores.profesorAutorizado(
            req.profesor.id,
            req.profesor.escuelaId
        )

        if (!autorizado) {
            return res.status(403).json({
                ok: false,
                mensaje: 'No tienes autorización para acceder al foro.'
            })
        }

        const mensajes = await ForoProfesores.getMensajes()

        return res.json({
            ok: true,
            mensajes
        })
    } catch (error) {
        console.error('Error al consultar el foro de profesores:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido cargar el foro.'
        })
    }
}

// Publicar mensajes en el foro común.
const publicarMensaje = async (req, res) => {
    try {
        const profesorId = req.profesor.id
        const escuelaId = req.profesor.escuelaId

        const titulo = typeof req.body.titulo === 'string'
            ? req.body.titulo.trim()
            : ''

        const mensaje = typeof req.body.mensaje === 'string'
            ? req.body.mensaje.trim()
            : ''

        if (!titulo || titulo.length > 200) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El título es obligatorio y no puede superar los 200 caracteres.'
            })
        }

        if (!mensaje || mensaje.length > 5000) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El mensaje es obligatorio y no puede superar los 5000 caracteres.'
            })
        }

        const autorizado = await ForoProfesores.profesorAutorizado(
            profesorId,
            escuelaId
        )

        if (!autorizado) {
            return res.status(403).json({
                ok: false,
                mensaje: 'No tienes autorización para publicar en el foro.'
            })
        }

        const id = await ForoProfesores.crearMensaje({
            profesorId,
            escuelaId,
            titulo,
            mensaje
        })

        return res.status(201).json({
            ok: true,
            mensaje: 'Mensaje publicado correctamente.',
            id
        })
    } catch (error) {
        console.error('Error al publicar en el foro de profesores:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido publicar el mensaje.'
        })
    }
}

module.exports = {
    getMensajes,
    publicarMensaje
}
