
const express = require('express')
const router = express.Router()

const authProfesor = require('../middlewares/authProfesor')

const {
    getMensajes,
    publicarMensaje
} = require('../controllers/foroProfesoresController')

// Todas las rutas de este archivo requieren sesión de profesor.
router.use(authProfesor)

router.get('/', getMensajes)
router.post('/', publicarMensaje)

module.exports = router
