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

const router = express.Router()

// El inicio de sesión debe permanecer público.
router.post('/login', loginAdmin)

// Todas las rutas declaradas a continuación requieren
// un token JWT válido de administrador.
router.use(authAdmin)

// Ruta de prueba protegida.
router.get('/prueba', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Autenticación de administrador correcta.'
    })
})

// Foro de estudiantes.
router.get(
    '/moderacion/foro-estudiantes',
    getForoEstudiantes
)

router.patch(
    '/moderacion/foro-estudiantes/:id/ocultar',
    ocultarMensajeEstudiante
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

// Materiales y recursos.
router.get(
    '/moderacion/recursos',
    getRecursosAdmin
)

router.patch(
    '/moderacion/recursos/:id/retirar',
    retirarRecurso
)

module.exports = router