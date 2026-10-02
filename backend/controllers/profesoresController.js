const Profesor = require('../model/collections/profesoresModel')
const getProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.getProfesores()

        res.json(profesores)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al obtener los profesores'
        })
    }
}

const getProfesorById = async (req, res) => {
    try {
        const profesor = await Profesor.getProfesorById(req.params.id)

        if (!profesor) {
            return res.status(404).json({
                error: 'Profesor no encontrado'
            })
        }

        res.json(profesor)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al obtener el profesor'
        })
    }
}

const createProfesor = async (req, res) => {
    try {
        const id = await Profesor.createProfesor(req.body)

        res.status(201).json({
            mensaje: 'Profesor creado correctamente',
            id
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al crear el profesor'
        })
    }
}

const deleteProfesor = async (req, res) => {
    try {
        const result = await Profesor.deleteProfesor(req.params.id)

        if (result === 0) {
            return res.status(404).json({
                error: 'Profesor no encontrado'
            })
        }

        res.json({
            mensaje: 'Profesor eliminado correctamente'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al eliminar el profesor'
        })
    }
}

module.exports = {
    getProfesores,
    getProfesorById,
    createProfesor,
    deleteProfesor
}