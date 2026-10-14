
const Matricula = require('../model/collections/matriculasModel')

// =====================================================
// CONSULTAR MATRÍCULAS
// =====================================================

const getMatriculas = async (req, res) => {
    try {
        const matriculas = await Matricula.getMatriculas()

        res.status(200).json({
            ok: true,
            datos: matriculas
        })
    } catch (error) {
        console.error('Error al obtener matrículas:', error.message)

        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener las matrículas.'
        })
    }
}

// =====================================================
// CREAR MATRÍCULA DEFINITIVA
// =====================================================

const createMatricula = async (req, res) => {
    const alumnoId = Number(req.body.alumno_id)
    const grupoId = Number(req.body.grupo_id)

    if (
        !Number.isInteger(alumnoId) ||
        alumnoId <= 0 ||
        !Number.isInteger(grupoId) ||
        grupoId <= 0
    ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Debes indicar un alumno y un grupo válidos.'
        })
    }

    try {
        const id = await Matricula.createMatricula({
            alumno_id: alumnoId,
            grupo_id: grupoId
        })

        res.status(201).json({
            ok: true,
            mensaje: 'Matrícula creada correctamente.',
            id
        })
    } catch (error) {
        console.error('Error al crear matrícula:', error.message)

        res.status(500).json({
            ok: false,
            mensaje: 'No se pudo crear la matrícula.'
        })
    }
}

// =====================================================
// ELIMINAR MATRÍCULA
// =====================================================

const deleteMatricula = async (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El identificador de matrícula no es válido.'
        })
    }

    try {
        const result = await Matricula.deleteMatricula(id)

        if (result === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Matrícula no encontrada.'
            })
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Matrícula eliminada correctamente.'
        })
    } catch (error) {
        console.error('Error al eliminar matrícula:', error.message)

        res.status(500).json({
            ok: false,
            mensaje: 'No se pudo eliminar la matrícula.'
        })
    }
}

// =====================================================
// CREAR SOLICITUD DEL FORMULARIO
// =====================================================

const createSolicitud = async (req, res) => {
    const datos = req.body

    const nombre = typeof datos.nombre === 'string'
        ? datos.nombre.trim()
        : ''

    const apellidos = typeof datos.apellidos === 'string'
        ? datos.apellidos.trim()
        : ''

    const email = typeof datos.email === 'string'
        ? datos.email.trim()
        : ''

    const escuelaId = Number(datos.escuela_id)

    if (!nombre) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El nombre es obligatorio.'
        })
    }

    if (!apellidos) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Los apellidos son obligatorios.'
        })
    }

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!emailValido) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El correo electrónico no es válido.'
        })
    }

    if (!Number.isInteger(escuelaId) || escuelaId <= 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Debes seleccionar una escuela.'
        })
    }

    try {
        const resultado = await Matricula.createSolicitud({
            ...datos,
            nombre,
            apellidos,
            email,
            escuela_id: escuelaId
        })

        res.status(201).json({
            ok: true,
            mensaje: 'La solicitud se ha enviado correctamente.',
            datos: resultado
        })
    } catch (error) {
        console.error('Error al crear solicitud:', error.message)

        res.status(error.statusCode || 500).json({
            ok: false,
            mensaje: error.statusCode
                ? error.message
                : 'No se pudo guardar la solicitud.'
        })
    }
}

module.exports = {
    getMatriculas,
    createMatricula,
    deleteMatricula,
    createSolicitud
}
