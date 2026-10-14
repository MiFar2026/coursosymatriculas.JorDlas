
const express = require('express')
const {
    getEscuelas
} = require('../controllers/escuelasController')

const { getHorarios } = require('../controllers/horariosController')
const { getRecursos } = require('../controllers/recursosController')

const router = express.Router()

router.get('/', getEscuelas)
router.get('/horarios', getHorarios)
router.get('/recursos', getRecursos)

// Métodos distintos de GET
router.all('/', (req, res) => {
    res.set('Allow', 'GET')

    res.status(405).json({
        ok: false,
        mensaje: 'Método no permitido.',
        datos: null
    })
})

module.exports = router
