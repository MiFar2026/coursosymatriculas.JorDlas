const express = require('express')

const {
    getClases,
    getClaseById,
    getClasesAlfabetizacion,
    createClase,
    deleteClase
} = require('../controllers/clasesController')

const router = express.Router()

router.get('/', getClases)
router.get('/alfabetizacion', getClasesAlfabetizacion)
router.get('/:id', getClaseById)
router.post('/', createClase)
router.delete('/:id', deleteClase)

module.exports = router