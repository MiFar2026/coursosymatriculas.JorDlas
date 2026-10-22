
const express = require('express')
const router = express.Router()

const {
    iniciarSesionProfesor,
    comprobarSesionProfesor,
    cerrarSesionProfesor
} = require('../controllers/accesoProfesorController')

const authProfesor = require('../middlewares/authProfesor')

// Iniciar sesión: todavía no requiere una cookie previa.
router.post('/login', iniciarSesionProfesor)

// Comprobar la sesión actual.
router.get('/session', authProfesor, comprobarSesionProfesor)

// Cerrar sesión.
router.post('/logout', cerrarSesionProfesor)

module.exports = router
