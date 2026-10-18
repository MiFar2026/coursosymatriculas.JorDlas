
const express = require('express')

const {
    getAvisosByEscuela,
    publicarAvisoNoDisponible
} = require('../controllers/avisosController')

const router = express.Router()

// Consultar avisos activos de una escuela.
router.get('/', getAvisosByEscuela)

// La publicación queda bloqueada hasta implementar autenticación.
router.post('/', publicarAvisoNoDisponible)

module.exports = router
