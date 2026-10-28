
const express = require('express')
const router = express.Router()

const authProfesor = require('../middlewares/authProfesor')

const {
  getMisGrupos,
  getAlumnosGrupo,
  getAsistenciaFecha,
  guardarAsistenciaFecha
} = require('../controllers/asistenciaController')

router.get('/mis-grupos', authProfesor, getMisGrupos)

router.get(
  '/grupos/:grupoId/alumnos',
  authProfesor,
  getAlumnosGrupo
)

router.get(
  '/grupos/:grupoId/fecha/:fecha',
  authProfesor,
  getAsistenciaFecha
)

router.put(
  '/grupos/:grupoId/fecha/:fecha',
  authProfesor,
  guardarAsistenciaFecha
)
console.log(
  'RUTAS ASISTENCIA REGISTRADAS:',
  router.stack
    .filter(capa => capa.route)
    .map(capa => ({
      metodo: Object.keys(capa.route.methods),
      ruta: capa.route.path
    }))
)
module.exports = router