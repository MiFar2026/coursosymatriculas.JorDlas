
const express = require('express')
const router = express.Router()

const {
  getMiPerfilAlumno
} = require('../controllers/perfilAlumnoController')

const autenticarAlumno = require('../middlewares/autenticarAlumno')

// Perfil privado del alumno que ha iniciado sesión
router.get('/me', autenticarAlumno, getMiPerfilAlumno)

module.exports = router
