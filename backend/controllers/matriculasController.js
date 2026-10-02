const Matricula = require('../model/collections/matriculasModel')



const getMatriculas = async (req, res) => {
    try {
        const matriculas = await Matricula.getMatriculas()

        res.json(matriculas)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al obtener las matrículas'
        })
    }
}

const createMatricula = async (req, res) => {
    try {
        const id = await Matricula.createMatricula(req.body)

        res.status(201).json({
            mensaje: 'Matrícula creada correctamente',
            id
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al crear la matrícula'
        })
    }
}

const deleteMatricula = async (req, res) => {
    try {
        const result = await Matricula.deleteMatricula(req.params.id)

        if (result === 0) {
            return res.status(404).json({
                error: 'Matrícula no encontrada'
            })
        }

        res.json({
            mensaje: 'Matrícula eliminada correctamente'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Error al eliminar la matrícula'
        })
    }
}

module.exports = {
    getMatriculas,
    createMatricula,
    deleteMatricula
}