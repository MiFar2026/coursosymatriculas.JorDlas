const express = require('express')
const router = express.Router()

const autenticarAlumno = require('../middlewares/autenticarAlumno')
const authProfesor = require('../middlewares/authProfesor')

const {
    listarGruposAlumno,
    listarCompanerosAlumno,
    listarGruposProfesor,
    listarAlumnosGrupoProfesor,
    leerMensajesAlumno,
    leerMensajesProfesor,
    leerMensajesCompaneroAlumno,
    enviarMensajeAlumno,
    enviarMensajeProfesor,
    enviarMensajeCompaneroAlumno,
    reportarMensajeAlumno,
    reportarMensajeProfesor
} = require('../controllers/mensajesController')

// =====================================================
// ALUMNADO
// =====================================================

router.get(
    '/alumno/grupos',
    autenticarAlumno,
    listarGruposAlumno
)

router.get(
    '/alumno/grupos/:grupoId/mensajes',
    autenticarAlumno,
    leerMensajesAlumno
)

router.post(
    '/alumno/grupos/:grupoId/mensajes',
    autenticarAlumno,
    enviarMensajeAlumno
)

router.post(
    '/alumno/mensajes/:mensajeId/reportar',
    autenticarAlumno,
    reportarMensajeAlumno
)

router.get(
    '/alumno/grupos/:grupoId/companeros',
    autenticarAlumno,
    listarCompanerosAlumno
)

router.get(
    '/alumno/grupos/:grupoId/alumnos/:alumnoId/mensajes',
    autenticarAlumno,
    leerMensajesCompaneroAlumno
)

router.post(
    '/alumno/grupos/:grupoId/alumnos/:alumnoId/mensajes',
    autenticarAlumno,
    enviarMensajeCompaneroAlumno
)

// =====================================================
// PROFESORADO
// =====================================================

router.get(
    '/profesor/grupos',
    authProfesor,
    listarGruposProfesor
)

router.get(
    '/profesor/grupos/:grupoId/alumnos',
    authProfesor,
    listarAlumnosGrupoProfesor
)

router.get(
    '/profesor/grupos/:grupoId/alumnos/:alumnoId/mensajes',
    authProfesor,
    leerMensajesProfesor
)

router.post(
    '/profesor/grupos/:grupoId/alumnos/:alumnoId/mensajes',
    authProfesor,
    enviarMensajeProfesor
)

router.post(
    '/profesor/mensajes/:mensajeId/reportar',
    authProfesor,
    reportarMensajeProfesor
)

module.exports = router