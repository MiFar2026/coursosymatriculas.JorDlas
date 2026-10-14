
const express = require('express')

const {
    getMatriculas,
    createMatricula,
    deleteMatricula,
    createSolicitud
} = require('../controllers/matriculasController')

const router = express.Router()

// Matrículas definitivas.
router.get('/', getMatriculas)
router.post('/', createMatricula)
router.delete('/:id', deleteMatricula)

// Solicitudes procedentes del formulario.
router.post('/solicitudes', createSolicitud)

module.exports = router
