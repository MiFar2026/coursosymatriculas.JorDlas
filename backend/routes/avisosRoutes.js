const express = require('express')
const router = express.Router()

const {
    getAvisosByEscuela,
    getMisAvisos,
    publicarAviso,
    getMisGrupos,
    getAlumnosDelGrupo
} = require('../controllers/avisosController')

const authProfesor = require('../middlewares/authProfesor')
const autenticarAlumno = require('../middlewares/autenticarAlumno')

// Grupos y alumnos: solo para el profesor autenticado.
router.get('/mis-grupos', authProfesor, getMisGrupos)

router.get(
    '/mis-grupos/:grupoId/alumnos',
    authProfesor,
    getAlumnosDelGrupo
)

// Avisos privados del alumno autenticado.
router.get('/mis-avisos', autenticarAlumno, getMisAvisos)

// Publicar un aviso requiere sesión de profesor.
router.post('/', authProfesor, publicarAviso)

// Consulta pública de avisos generales de una escuela.
router.get('/', getAvisosByEscuela)

module.exports = router