
const express = require('express')
const router = express.Router()

const autenticarAlumno = require('../middlewares/autenticarAlumno')
const subirTarea = require('../middlewares/validators/subirTarea')

const {
  obtenerMisEntregas,
  crearEntrega
} = require('../controllers/tareasController')

// Consultar las entregas del alumno autenticado.
router.get('/', autenticarAlumno, obtenerMisEntregas)

// Enviar una entrega con un máximo de 10 archivos.
router.post(
  '/',
  autenticarAlumno,
  subirTarea.array('archivos', 10),
  crearEntrega
)

module.exports = router
