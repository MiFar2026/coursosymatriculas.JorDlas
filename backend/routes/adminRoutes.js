
const express = require('express')
const { loginAdmin } = require('../controllers/adminController')
const authAdmin = require('../middlewares/authAdmin')

const {
    getForoEstudiantes,
    ocultarMensajeEstudiante,
    mostrarMensajeEstudiante,
    eliminarMensajeEstudiante,
    getForoProfesores,
    ocultarMensajeProfesor,
    mostrarMensajeProfesor,
    eliminarMensajeProfesor,
    getRecursosAdmin,
    retirarRecurso
} = require('../controllers/adminModeracionController')

const {
    listarVoluntarios,
    cambiarEstadoVoluntario
} = require('../controllers/voluntariosAdminController')
const router = express.Router()

// Acceso público para iniciar sesión.
router.post('/login', loginAdmin)

// El resto de las rutas requieren autenticación de administrador.
router.use(authAdmin)
// Gestión de voluntariado.
router.get(
    '/voluntarios',
    listarVoluntarios
)

router.patch(
    '/voluntarios/:id/estado',
    cambiarEstadoVoluntario
)

// Foro de estudiantes.
router.get(
    '/moderacion/foro-estudiantes',
    getForoEstudiantes
)

router.patch(
    '/moderacion/foro-estudiantes/:id/ocultar',
    ocultarMensajeEstudiante
)

router.patch(
    '/moderacion/foro-estudiantes/:id/mostrar',
    mostrarMensajeEstudiante
)

router.post(
    '/moderacion/foro-estudiantes/:id/eliminar',
    eliminarMensajeEstudiante
)

// Foro de profesores.
router.get(
    '/moderacion/foro-profesores',
    getForoProfesores
)

router.patch(
    '/moderacion/foro-profesores/:id/ocultar',
    ocultarMensajeProfesor
)

router.patch(
    '/moderacion/foro-profesores/:id/mostrar',
    mostrarMensajeProfesor
)

router.post(
    '/moderacion/foro-profesores/:id/eliminar',
    eliminarMensajeProfesor
)


// Materiales.
router.get(
    '/moderacion/recursos',
    getRecursosAdmin
)

router.patch(
    '/moderacion/recursos/:id/retirar',
    retirarRecurso
)

module.exports = router
