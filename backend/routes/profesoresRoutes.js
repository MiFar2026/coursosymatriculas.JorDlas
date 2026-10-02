const express = require('express')

const {
    getProfesores,
    getProfesorById,
    createProfesor,
    deleteProfesor
} = require('../controllers/profesoresController')

const router = express.Router()

router.get('/', getProfesores)
router.get('/:id', getProfesorById)
router.post('/', createProfesor)
router.delete('/:id', deleteProfesor)

module.exports = router