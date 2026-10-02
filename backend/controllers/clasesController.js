const Clase = require('../model/collections/clasesModel')


const getClases = async (req, res) => {
    try {
        const clases = await Clase.getClases()

        res.json(clases)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al obtener las clases'
        })
    }
}

const getClaseById = async (req, res) => {
    try {
        const clase = await Clase.getClaseById(req.params.id)

        if (!clase) {
            return res.status(404).json({
                error: 'Clase no encontrada'
            })
        }

        res.json(clase)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al obtener la clase'
        })
    }
}

const getClasesAlfabetizacion = async (req, res) => {
    try {
        const clases = await Clase.getClasesAlfabetizacion()

        res.json(clases)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al obtener las clases de alfabetización'
        })
    }
}

const createClase = async (req, res) => {
    try {
        const id = await Clase.createClase(req.body)

        res.status(201).json({
            mensaje: 'Clase creada correctamente',
            id
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al crear la clase'
        })
    }
}

const deleteClase = async (req, res) => {
    try {
        const result = await Clase.deleteClase(req.params.id)

        if (result === 0) {
            return res.status(404).json({
                error: 'Clase no encontrada'
            })
        }

        res.json({
            mensaje: 'Clase eliminada correctamente'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al eliminar la clase'
        })
    }
}

module.exports = {
    getClases,
    getClaseById,
    getClasesAlfabetizacion,
    createClase,
    deleteClase
}