
const Aviso = require('../model/collections/avisosModel')

// =====================================================
// AVISOS GENERALES DE UNA ESCUELA
// =====================================================

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

// =====================================================
// AVISOS DE ADMINISTRACIÓN PARA EL PROFESOR AUTENTICADO
// =====================================================

const getAvisosAdminParaProfesor = async (req, res) => {
    try {
        const profesorId = req.profesor?.id
        const escuelaId = Number(req.profesor?.escuelaId)

        if (!profesorId || ![1, 2].includes(escuelaId)) {
            return res.status(403).json({
                ok: false,
                mensaje: 'No se ha podido verificar tu escuela.'
            })
        }

        const avisos = await Aviso.getAvisosAdminByEscuela(escuelaId)

        return res.json({
            ok: true,
            escuelaId,
            avisos
        })
    } catch (error) {
        console.error(
            'Error al obtener los avisos administrativos del profesor:',
            error
        )

        return res.status(500).json({
            ok: false,
            mensaje: 'No se han podido obtener los avisos de administración.'
        })
    }
}
// =====================================================
// AVISOS QUE PUEDE VER EL ALUMNO
// =====================================================

const getMisAvisos = async (req, res) => {
    try {
        const alumnoId = req.alumnoId

        if (!alumnoId) {
            return res.status(401).json({
                ok: false,
                mensaje: 'No se ha podido identificar al alumno.'
            })
        }

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

// =====================================================
// PUBLICAR AVISO DE PROFESOR
// Solo puede publicar en sus propios grupos.
// Todos los avisos caducan automáticamente en 72 horas.
// No existen avisos individuales.
// =====================================================

const publicarAviso = async (req, res) => {
    try {
        const profesorId = req.profesor.id
        const escuelaId = Number(req.profesor.escuelaId)

        const grupoId = Number(req.body.grupoId)

        const titulo = typeof req.body.titulo === 'string'
            ? req.body.titulo.trim()
            : ''

        const mensaje = typeof req.body.mensaje === 'string'
            ? req.body.mensaje.trim()
            : ''

        // Comprobamos los datos obligatorios.
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

        // Comprobamos que el profesor pertenece al grupo
        // y que el grupo corresponde a su escuela.
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

        // El modelo establece automáticamente:
        // - origen: PROFESOR
        // - escuela_id
        // - fecha de caducidad: 72 horas
        const avisoId = await Aviso.crearAviso({
            grupoId,
            profesorId,
            escuelaId,
            titulo,
            mensaje
        })

        return res.status(201).json({
            ok: true,
            mensaje: 'Aviso publicado para el grupo. Caducará automáticamente en 72 horas.',
            aviso: {
                id: avisoId,
                grupoId,
                escuelaId,
                profesorId,
                titulo,
                mensaje,
                origen: 'PROFESOR'
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

// =====================================================
// GRUPOS DISPONIBLES PARA EL PROFESOR
// =====================================================

const getMisGrupos = async (req, res) => {
    try {
        const profesorId = req.profesor.id
        const escuelaId = Number(req.profesor.escuelaId)

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

// =====================================================
// EXPORTACIONES
// =====================================================

module.exports = {
    getAvisosByEscuela,
    getAvisosAdminParaProfesor,
    getMisAvisos,
    publicarAviso,
    getMisGrupos
}
