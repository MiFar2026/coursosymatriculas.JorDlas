
const ForoProfesores = require('../model/collections/foroProfesoresModel')

// Consultar el foro común de ambas escuelas.
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

// Publicar un mensaje nuevo.
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

// Responder a una publicación del foro común.
const publicarRespuesta = async (req, res) => {
    try {
        const profesorId = Number(req.profesor.id)
        const escuelaId = Number(req.profesor.escuelaId)
        const mensajeId = Number(req.params.mensajeId)

        const respuesta = typeof req.body.respuesta === 'string'
            ? req.body.respuesta.trim()
            : ''

        if (!Number.isSafeInteger(mensajeId) || mensajeId <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El identificador del mensaje no es válido.'
            })
        }

        if (!respuesta || respuesta.length > 5000) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La respuesta es obligatoria y no puede superar los 5000 caracteres.'
            })
        }

        const autorizado = await ForoProfesores.profesorAutorizado(
            profesorId,
            escuelaId
        )

        if (!autorizado) {
            return res.status(403).json({
                ok: false,
                mensaje: 'No tienes autorización para responder en el foro.'
            })
        }

        const existe = await ForoProfesores.mensajeExiste(mensajeId)

        if (!existe) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se ha encontrado esa publicación.'
            })
        }

        const id = await ForoProfesores.crearRespuesta({
            mensajeId,
            profesorId,
            escuelaId,
            respuesta
        })

        return res.status(201).json({
            ok: true,
            mensaje: 'Respuesta publicada correctamente.',
            id
        })
    } catch (error) {
        console.error('Error al responder en el foro de profesores:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido publicar la respuesta.'
        })
    }
}

module.exports = {
    getMensajes,
    publicarMensaje,
    publicarRespuesta
}
