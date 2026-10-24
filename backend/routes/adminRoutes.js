
const express = require('express')

const { loginAdmin } = require('../controllers/adminController')
const authAdmin = require('../middlewares/authAdmin')

// Controladores de moderación y recursos.
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

// Controladores de profesores y grupos.
const {
    listarProfesores,
    obtenerHistorialProfesor,
    actualizarProfesor,
    listarGruposAdmin,
    asignarProfesorGrupo
} = require('../controllers/adminProfesoresController')

// Controladores de voluntariado.
const {
    listarVoluntarios,
    cambiarEstadoVoluntario
} = require('../controllers/voluntariosAdminController')

const router = express.Router()

// =====================================================
// ACCESO DE ADMINISTRADOR
// =====================================================

// Ruta pública para iniciar sesión.
router.post('/login', loginAdmin)

// Todas las rutas siguientes requieren autenticación.
router.use(authAdmin)

// =====================================================
// VOLUNTARIADO
// =====================================================

router.get(
    '/voluntarios',
    listarVoluntarios
)

router.patch(
    '/voluntarios/:id/estado',
    cambiarEstadoVoluntario
)

// =====================================================
// PROFESORES
// =====================================================

router.get(
    '/profesores',
    listarProfesores
)

router.get(
    '/profesores/:id/historial',
    obtenerHistorialProfesor
)

router.put(
    '/profesores/:id',
    actualizarProfesor
)

// =====================================================
// GRUPOS Y ASIGNACIÓN DE PROFESORES
// =====================================================

router.get(
    '/grupos',
    listarGruposAdmin
)

router.patch(
    '/grupos/:id/profesor',
    asignarProfesorGrupo
)

// =====================================================
// MODERACIÓN DEL FORO DE ESTUDIANTES
// =====================================================

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

// =====================================================
// MODERACIÓN DEL FORO DE PROFESORES
// =====================================================

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

// =====================================================
// RECURSOS Y MATERIALES
// =====================================================

router.get(
    '/moderacion/recursos',
    getRecursosAdmin
)

router.patch(
    '/moderacion/recursos/:id/retirar',
    retirarRecurso
)

module.exports = router
