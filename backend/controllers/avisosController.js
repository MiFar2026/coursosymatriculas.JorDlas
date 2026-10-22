
const Aviso = require('../model/collections/avisosModel')

// Consulta de avisos generales de una escuela.
const getAvisosByEscuela = async (req, res) => {
    try {
        const escuelaId = Number(req.query.escuelaId)

        if (![1, 2].includes(escuelaId)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Debes indicar una escuela válida: 1 o 2.'
            })
        }

        const avisos = await Aviso.getAvisosByEscuela(escuelaId)

        return res.json({
            ok: true,
            escuelaId,
            avisos
        })
    } catch (error) {
        console.error('Error al obtener avisos:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener los avisos.'
        })
    }
}

// El alumno solo recibe los avisos correspondientes a su sesión.
const getMisAvisos = async (req, res) => {
    try {
        const alumnoId = req.alumnoId
        const avisos = await Aviso.getAvisosByAlumno(alumnoId)

        return res.json({
            ok: true,
            avisos
        })
    } catch (error) {
        console.error('Error al obtener los avisos del alumno:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se han podido obtener tus avisos.'
        })
    }
}

// Publicación para un grupo completo o para un alumno concreto.
const publicarAviso = async (req, res) => {
    try {
        const profesorId = req.profesor.id
        const escuelaId = req.profesor.escuelaId

        const grupoId = Number(req.body.grupoId)
        const titulo = typeof req.body.titulo === 'string'
            ? req.body.titulo.trim()
            : ''
        const mensaje = typeof req.body.mensaje === 'string'
            ? req.body.mensaje.trim()
            : ''
        const tipo = req.body.tipo

        const alumnoIdRecibido = req.body.alumnoId
        let alumnoId = null

        if (
            alumnoIdRecibido !== undefined &&
            alumnoIdRecibido !== null &&
            alumnoIdRecibido !== ''
        ) {
            alumnoId = Number(alumnoIdRecibido)

            if (!Number.isInteger(alumnoId) || alumnoId < 1) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El alumno seleccionado no es válido.'
                })
            }
        }

        if (!Number.isInteger(grupoId) || grupoId < 1) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Debes seleccionar un grupo válido.'
            })
        }

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

        if (!['PERMANENTE', 'DIARIO'].includes(tipo)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El tipo debe ser PERMANENTE o DIARIO.'
            })
        }

        // No confiamos en el grupo enviado por el navegador:
        // comprobamos la asignación en la base de datos.
        const autorizado = await Aviso.profesorPuedePublicarEnGrupo(
            profesorId,
            escuelaId,
            grupoId
        )

        if (!autorizado) {
            return res.status(403).json({
                ok: false,
                mensaje: 'No tienes autorización para publicar en ese grupo.'
            })
        }

        // Si se ha seleccionado un alumno, debe pertenecer
        // al grupo elegido y tener matrícula activa.
        if (alumnoId !== null) {
            const pertenece = await Aviso.alumnoPerteneceAlGrupo(
                alumnoId,
                grupoId
            )

            if (!pertenece) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El alumno no tiene una matrícula activa en ese grupo.'
                })
            }
        }

        const avisoId = await Aviso.crearAviso({
            grupoId,
            profesorId,
            alumnoId,
            titulo,
            mensaje,
            tipo
        })

        return res.status(201).json({
            ok: true,
            mensaje: alumnoId === null
                ? 'Aviso publicado para el grupo.'
                : 'Aviso publicado para el alumno seleccionado.',
            aviso: {
                id: avisoId,
                grupoId,
                alumnoId,
                titulo,
                mensaje,
                tipo
            }
        })
    } catch (error) {
        console.error('Error al publicar aviso:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se ha podido publicar el aviso.'
        })
    }
}

// Grupos disponibles para el profesor que ha iniciado sesión.
const getMisGrupos = async (req, res) => {
    try {
        const profesorId = req.profesor.id
        const escuelaId = req.profesor.escuelaId

        const grupos = await Aviso.getGruposByProfesor(
            profesorId,
            escuelaId
        )

        return res.json({
            ok: true,
            grupos
        })
    } catch (error) {
        console.error('Error al obtener los grupos del profesor:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se han podido obtener tus grupos.'
        })
    }
}

// Alumnos matriculados en un grupo del profesor autenticado.
const getAlumnosDelGrupo = async (req, res) => {
    try {
        const profesorId = req.profesor.id
        const escuelaId = req.profesor.escuelaId
        const grupoId = Number(req.params.grupoId)

        if (!Number.isInteger(grupoId) || grupoId < 1) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El grupo seleccionado no es válido.'
            })
        }

        // Primero comprobamos que el profesor puede publicar
        // en ese grupo, antes de consultar sus alumnos.
        const autorizado = await Aviso.profesorPuedePublicarEnGrupo(
            profesorId,
            escuelaId,
            grupoId
        )

        if (!autorizado) {
            return res.status(403).json({
                ok: false,
                mensaje: 'No tienes acceso a ese grupo.'
            })
        }

        const alumnos = await Aviso.getAlumnosByGrupo(
            profesorId,
            escuelaId,
            grupoId
        )

        return res.json({
            ok: true,
            alumnos
        })
    } catch (error) {
        console.error('Error al obtener los alumnos del grupo:', error)

        return res.status(500).json({
            ok: false,
            mensaje: 'No se han podido obtener los alumnos del grupo.'
        })
    }
}

module.exports = {
    getAvisosByEscuela,
    getMisAvisos,
    publicarAviso,
    getMisGrupos,
    getAlumnosDelGrupo
}
