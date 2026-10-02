const Alumno = require('../model/collections/alumnadoModel')
const getAlumnado = async (req, res) => {
    try {
        const alumnado = await Alumno.getAlumnado()

        res.json(alumnado)
    } catch (error) {
        console.error(error)
        res.status(500).json({
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

        res.json(alumno)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al obtener el alumno'
        })
    }
}

const createAlumno = async (req, res) => {
    try {
        const id = await Alumno.createAlumno(req.body)

        res.status(201).json({
            mensaje: 'Alumno creado correctamente',
            id
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al crear el alumno'
        })
    }
}

const deleteAlumno = async (req, res) => {
    try {
        const result = await Alumno.deleteAlumno(req.params.id)

        if (result === 0) {
            return res.status(404).json({
                error: 'Alumno no encontrado'
            })
        }

        res.json({
            mensaje: 'Alumno eliminado correctamente'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al eliminar el alumno'
        })
    }
}

module.exports = {
    getAlumnado,
    getAlumnoById,
    createAlumno,
    deleteAlumno
}