
const express = require('express')
const router = express.Router()

const {
    getAvisosByEscuela,
    getMisAvisos,
    publicarAviso,
    getMisGrupos,
    getAvisosAdminParaProfesor
} = require('../controllers/avisosController')

const authProfesor = require('../middlewares/authProfesor')
const autenticarAlumno = require('../middlewares/autenticarAlumno')

// Grupos disponibles para el profesor autenticado.
router.get('/mis-grupos', authProfesor, getMisGrupos)

// Avisos administrativos de la escuela del profesor autenticado.
router.get(
    '/admin/mis-avisos',
    authProfesor,
    getAvisosAdminParaProfesor
)

// Avisos del alumno autenticado.
router.get('/mis-avisos', autenticarAlumno, getMisAvisos)

// Publicar un aviso requiere sesión de profesor.
router.post('/', authProfesor, publicarAviso)

// Consulta de avisos generales de una escuela.
router.get('/', getAvisosByEscuela)

module.exports = router
