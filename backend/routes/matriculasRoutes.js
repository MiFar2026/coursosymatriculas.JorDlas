
const express = require('express')

const {
    getMatriculas,
    createMatricula,
    deleteMatricula,
    restaurarMatricula,
    createSolicitud
} = require('../controllers/matriculasController')

const router = express.Router()

// Matrículas definitivas.
router.get('/', getMatriculas)
router.post('/', createMatricula)

// Retirar matrícula sin borrar el registro SQL.
router.delete('/:id', deleteMatricula)

// Recuperar matrícula retirada.
router.patch('/:id/recuperar', restaurarMatricula)

// Solicitudes procedentes del formulario.
router.post('/solicitudes', createSolicitud)

module.exports = router
