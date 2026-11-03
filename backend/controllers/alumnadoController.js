
const Alumno = require('../model/collections/alumnadoModel')

const getAlumnado = async (req, res) => {
    try {
        const alumnado = await Alumno.getAlumnado()
        return res.json(alumnado)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Error al obtener el alumnado'
        })
    }
}

const getAlumnoById = async (req, res) => {
    try {
        const alumno = await Alumno.getAlumnoById(req.params.id)

        if (!alumno) {
            return res.status(404).json({
                error: 'Alumno no encontrado'
            })
        }

        return res.json(alumno)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Error al obtener el alumno'
        })
    }
}

const createAlumno = async (req, res) => {
    try {
        const id = await Alumno.createAlumno(req.body)

        return res.status(201).json({
            mensaje: 'Alumno creado correctamente',
            id
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Error al crear el alumno'
        })
    }
}

// Retirada lógica: conserva el registro y el historial en SQL.
const deleteAlumno = async (req, res) => {
    try {
        const result = await Alumno.deleteAlumno(req.params.id)

        if (result === 0) {
            return res.status(404).json({
                error: 'Alumno no encontrado o ya retirado'
            })
        }

        return res.json({
            mensaje: 'Alumno retirado de la aplicación. Sus datos se conservan y pueden recuperarse.'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Error al retirar el alumno'
        })
    }
}

// Recuperar un alumno retirado por administración.
const restaurarAlumno = async (req, res) => {
    try {
        const result = await Alumno.restaurarAlumno(req.params.id)

        if (result === 0) {
            return res.status(404).json({
                error: 'Alumno no encontrado o no está retirado'
            })
        }

        return res.json({
            mensaje: 'Alumno recuperado correctamente.'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Error al recuperar el alumno'
        })
    }
}

module.exports = {
    getAlumnado,
    getAlumnoById,
    createAlumno,
    deleteAlumno,
    restaurarAlumno
}
