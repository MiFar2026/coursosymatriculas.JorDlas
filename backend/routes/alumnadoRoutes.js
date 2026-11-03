
const express = require('express')

const {
    getAlumnado,
    getAlumnoById,
    createAlumno,
    deleteAlumno,
    restaurarAlumno
} = require('../controllers/alumnadoController')

const router = express.Router()

router.get('/', getAlumnado)
router.get('/:id', getAlumnoById)
router.post('/', createAlumno)

// Retirar alumno sin borrar sus datos de SQL.
router.delete('/:id', deleteAlumno)

// Recuperar alumno retirado.
router.patch('/:id/recuperar', restaurarAlumno)

module.exports = router
