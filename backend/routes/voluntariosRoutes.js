
const express = require('express')
const router = express.Router()

const {
  crearVoluntario
} = require('../controllers/voluntariosController')

// Ruta temporal para comprobar que funciona
router.get('/test', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'Ruta de voluntariado activa'
  })
})

// Recibir solicitudes del formulario
router.post('/', crearVoluntario)

module.exports = router
