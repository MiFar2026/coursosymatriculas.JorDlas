
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
    retirarRecurso,
    descargarRecursoAdmin,
    eliminarRecursoAdmin
} = require('../controllers/adminModeracionController')

// Controlador de moderación de mensajes privados.
const {
    listarMensajesReportados,
    revisarReporteMensaje,
    retirarMensajeReportado
} = require('../controllers/mensajesModeracionController')

// Controladores de profesores y grupos.
const {
    listarProfesores,
    crearProfesor,
    obtenerHistorialProfesor,
    actualizarProfesor,
    listarGruposAdmin,
    asignarProfesorGrupo
} = require('../controllers/adminProfesoresController')

// Controladores de alumnos.
const {
    listarAlumnos,
    obtenerAlumno,
    actualizarAlumno,
    cambiarEstadoAlumno,
    crearAlumno
} = require('../controllers/adminAlumnosController')

// Controladores de voluntariado.
const {
    listarVoluntarios,
    cambiarEstadoVoluntario
} = require('../controllers/voluntariosAdminController')

// Controladores de resultados.
const {
    obtenerNotasFinales,
    actualizarEstadoCertificado
} = require('../controllers/resultadosController')

// Controlador de asistencia.
const {
    getResumenHorasAsistencia
} = require('../controllers/asistenciaAdminController')

// Controladores de escuelas, cursos y grupos.
const {
    crearCursoAdmin,
    crearGrupoAdmin
} = require('../controllers/adminEscuelasController')

// Controladores de avisos.
const {
    listarAvisosAdmin,
    publicarAvisoAdmin,
    cambiarEstadoAvisoAdmin,
    editarAvisoAdmin,
    cambiarFechaExpiracionAdmin,
    ampliarAvisoAdmin,
    eliminarAvisoAdmin
} = require('../controllers/avisosAdminController')

const router = express.Router()

// =====================================================
// ACCESO DE ADMINISTRADOR
// =====================================================

// Ruta pública para iniciar sesión.
router.post('/login', loginAdmin)

// Todas las rutas siguientes requieren autenticación.
router.use(authAdmin)

// =====================================================
// GESTIÓN DE AVISOS
// =====================================================

router.get('/avisos', listarAvisosAdmin)

router.post('/avisos', publicarAvisoAdmin)

router.put(
    '/avisos/:id',
    editarAvisoAdmin
)

router.patch(
    '/avisos/:id/fecha-expiracion',
    cambiarFechaExpiracionAdmin
)

router.patch(
    '/avisos/:id/estado',
    cambiarEstadoAvisoAdmin
)

router.patch(
    '/avisos/:id/ampliar',
    ampliarAvisoAdmin
)

router.delete(
    '/avisos/:id',
    eliminarAvisoAdmin
)

// =====================================================
// ASISTENCIA
// =====================================================

router.get(
    '/asistencia/horas',
    getResumenHorasAsistencia
)

// =====================================================
// GESTIÓN DE ALUMNOS
// =====================================================

router.post('/alumnos', crearAlumno)
router.get('/alumnos', listarAlumnos)
router.get('/alumnos/:id', obtenerAlumno)
router.put('/alumnos/:id', actualizarAlumno)
router.patch('/alumnos/:id/estado', cambiarEstadoAlumno)

// =====================================================
// RESULTADOS FINALES PARA CERTIFICADOS
// =====================================================

router.get(
    '/resultados-finales',
    obtenerNotasFinales
)

router.patch(
    '/resultados-finales/:id/certificado',
    actualizarEstadoCertificado
)

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

router.post('/profesores', crearProfesor)
router.get('/profesores', listarProfesores)
router.get('/profesores/:id/historial', obtenerHistorialProfesor)
router.put('/profesores/:id', actualizarProfesor)

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
// ESCUELAS, CURSOS Y GRUPOS
// =====================================================

router.post('/cursos', crearCursoAdmin)
router.post('/grupos', crearGrupoAdmin)

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

router.get(
    '/moderacion/recursos/:id/descargar',
    descargarRecursoAdmin
)

router.delete(
    '/moderacion/recursos/:id',
    eliminarRecursoAdmin
)

// =====================================================
// MODERACIÓN DE MENSAJES PRIVADOS REPORTADOS
// =====================================================

router.get(
    '/moderacion/mensajes-reportados',
    listarMensajesReportados
)

router.patch(
    '/moderacion/mensajes-reportados/:reporteId/revisar',
    revisarReporteMensaje
)

router.post(
    '/moderacion/mensajes-reportados/:reporteId/retirar',
    retirarMensajeReportado
)

module.exports = router
