
const express = require('express')
const router = express.Router()

const {
  getEscuelas
} = require('../controllers/escuelasController')

const {
  getHorarios
} = require('../controllers/horariosController')

const {
  getRecursos,
  getRecursosAlumno,
  getMisGruposRecursos,
  publicarRecurso,
  actualizarRecurso,
  eliminarRecurso
} = require('../controllers/recursosController')

const authProfesor = require('../middlewares/authProfesor')
const autenticarAlumno = require('../middlewares/autenticarAlumno')
const subirRecurso = require('../middlewares/validators/subirRecurso')
// Rutas de consulta que ya existían.
router.get('/', getEscuelas)
router.get('/horarios', getHorarios)
router.get('/recursos', getRecursos)
router.get(
  '/recursos/alumno',
  autenticarAlumno,
  getRecursosAlumno
)
// Gestión de recursos: solo profesores autenticados.
router.get(
  '/recursos/mis-grupos',
  authProfesor,
  getMisGruposRecursos
)

router.put('/recursos/:id', authProfesor, actualizarRecurso)
router.delete('/recursos/:id', authProfesor, eliminarRecurso)

// Subida de recursos: solo profesores autenticados.
router.post('/recursos', authProfesor, (req, res, next) => {
  subirRecurso(req, res, error => {
    if (error) {
      const mensaje = error.code === 'LIMIT_FILE_SIZE'
        ? 'El archivo no puede superar los 20 MB.'
        : error.message || 'No se pudo subir el archivo.'

      return res.status(400).json({
        ok: false,
        mensaje
      })
    }

    next()
  })
}, publicarRecurso)

router.all('/', (req, res) => {
  res.set('Allow', 'GET')
  res.status(405).json({
    ok: false,
    mensaje: 'Método no permitido.',
    datos: null
  })
})

module.exports = router
