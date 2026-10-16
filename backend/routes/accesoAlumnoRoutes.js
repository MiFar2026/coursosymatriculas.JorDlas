
const express = require('express')
const router = express.Router()

const {
  iniciarSesionAlumno,
  cerrarSesionAlumno
} = require('../controllers/accesoAlumnoController')

router.post('/login', iniciarSesionAlumno)
router.post('/logout', cerrarSesionAlumno)

module.exports = router
