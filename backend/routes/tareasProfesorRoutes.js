
const express = require('express')
const router = express.Router()

const authProfesor = require('../middlewares/authProfesor')

const {
  obtenerTareasProfesor,
  descargarTareaProfesor
} = require('../controllers/tareasController')

router.get('/', authProfesor, obtenerTareasProfesor)

router.get(
  '/:id/descargar',
  authProfesor,
  descargarTareaProfesor
)

module.exports = router
