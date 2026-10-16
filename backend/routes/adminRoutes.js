const express = require('express')

const { loginAdmin } = require('../controllers/adminController')
const authAdmin = require('../middlewares/authAdmin')

const {
  getForoEstudiantes,
  ocultarMensajeEstudiante,
  getForoProfesores,
  ocultarMensajeProfesor,
  getRecursosAdmin,
  retirarRecurso
} = require('../controllers/adminModeracionController')

const {
  listarVoluntarios,
  cambiarEstadoVoluntario
} = require('../controllers/voluntariosAdminController')

const router = express.Router()

// Login público
router.post('/login', loginAdmin)

// Todas las rutas siguientes requieren JWT de administrador
router.use(authAdmin)

router.get('/prueba', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'Autenticación de administrador correcta.'
  })
})

// Foro de estudiantes
router.get(
  '/moderacion/foro-estudiantes',
  getForoEstudiantes
)

router.patch(
  '/moderacion/foro-estudiantes/:id/ocultar',
  ocultarMensajeEstudiante
)

// Foro de profesores
router.get(
  '/moderacion/foro-profesores',
  getForoProfesores
)

router.patch(
  '/moderacion/foro-profesores/:id/ocultar',
  ocultarMensajeProfesor
)

// Materiales y recursos
router.get(
  '/moderacion/recursos',
  getRecursosAdmin
)

router.patch(
  '/moderacion/recursos/:id/retirar',
  retirarRecurso
)

// Gestión de voluntariado
router.get('/voluntarios', listarVoluntarios)
router.patch('/voluntarios/:id/estado', cambiarEstadoVoluntario)

module.exports = router