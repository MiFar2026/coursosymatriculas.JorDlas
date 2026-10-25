
const express = require('express')
const router = express.Router()

const authProfesor = require('../middlewares/authProfesor')

const {
  listarMisActividades,
  publicarActividad,
  retirarActividad
} = require('../controllers/actividadesController')

// Todas estas rutas requieren una sesión válida de profesor.
router.use(authProfesor)

router.get('/', listarMisActividades)
router.post('/', publicarActividad)
router.patch('/:id/retirar', retirarActividad)

module.exports = router
