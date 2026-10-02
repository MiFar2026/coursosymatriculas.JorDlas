const express = require('express')

const {
    getAlumnado,
    getAlumnoById,
    createAlumno,
    deleteAlumno
} = require('../controllers/alumnadoController')

const router = express.Router()

router.get('/', getAlumnado)
router.get('/:id', getAlumnoById)
router.post('/', createAlumno)
router.delete('/:id', deleteAlumno)

module.exports = router