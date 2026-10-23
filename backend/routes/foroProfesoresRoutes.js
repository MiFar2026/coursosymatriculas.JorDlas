
const express = require('express')
const router = express.Router()

const authProfesor = require('../middlewares/authProfesor')

const {
    getMensajes,
    publicarMensaje,
    publicarRespuesta
} = require('../controllers/foroProfesoresController')

router.use(authProfesor)

router.get('/', getMensajes)
router.post('/', publicarMensaje)
router.post('/:mensajeId/respuestas', publicarRespuesta)

module.exports = router
