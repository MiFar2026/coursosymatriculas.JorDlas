
const express = require('express')
const router = express.Router()

const authProfesor = require('../middlewares/authProfesor')
const autenticarAlumno = require('../middlewares/autenticarAlumno')
const subirArchivo = require('../middlewares/validators/subirArchivoCorregido')

const {
  obtenerGruposProfesor,
  obtenerAlumnosGrupo,
  guardarResultado,
  obtenerMisResultados,
  descargarArchivoProfesor,
  descargarArchivoAlumno,
  obtenerNotasFinales
} = require('../controllers/resultadosController')

router.get('/profesor/grupos', authProfesor, obtenerGruposProfesor)

router.get(
  '/profesor/grupos/:grupoId/alumnos',
  authProfesor,
  obtenerAlumnosGrupo
)

router.post(
  '/profesor',
  authProfesor,
  subirArchivo.single('archivo_corregido'),
  guardarResultado
)

router.get(
  '/profesor/:id/archivo',
  authProfesor,
  descargarArchivoProfesor
)

router.get('/alumno', autenticarAlumno, obtenerMisResultados)

router.get(
  '/alumno/:id/archivo',
  autenticarAlumno,
  descargarArchivoAlumno
)

// Esta ruta necesita el middleware real de administración.
module.exports = router
