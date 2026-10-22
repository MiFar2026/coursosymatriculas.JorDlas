
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const {
  getGrupos,
  getMensajes,
  publicarMensaje
} = require('../controllers/foroAlumnosController')

// Permite una sesión válida de alumno o de profesor.
// No envía una respuesta de error hasta haber comprobado ambas sesiones.
function autenticarUsuarioForo(req, res, next) {
  const tokenAlumno = req.cookies?.sesion_alumno
  const secretAlumno = process.env.JWT_SECRET

  if (tokenAlumno && secretAlumno) {
    try {
      const sesion = jwt.verify(tokenAlumno, secretAlumno)

      if (
        sesion.tipo === 'alumno' &&
        Number.isInteger(sesion.alumnoId) &&
        sesion.alumnoId > 0
      ) {
        req.alumnoId = sesion.alumnoId
        return next()
      }
    } catch (error) {
      // Si la sesión de alumno no es válida, comprobamos la de profesor.
    }
  }

  const tokenProfesor = req.cookies?.sesionProfesor
  const secretProfesor = process.env.JWT_PROFESOR_SECRET

  if (tokenProfesor && secretProfesor) {
    try {
      const sesion = jwt.verify(tokenProfesor, secretProfesor)

      if (
        sesion.tipo === 'profesor' &&
        Number.isInteger(sesion.profesorId) &&
        sesion.profesorId > 0 &&
        [1, 2].includes(sesion.escuelaId)
      ) {
        req.profesor = {
          id: sesion.profesorId,
          escuelaId: sesion.escuelaId
        }

        return next()
      }
    } catch (error) {
      // Se rechazará la petición si ninguna sesión es válida.
    }
  }

  return res.status(401).json({
    ok: false,
    mensaje: 'Debes iniciar sesión como alumno o profesor.'
  })
}

router.use(autenticarUsuarioForo)

router.get('/grupos', getGrupos)
router.get('/', getMensajes)
router.post('/', publicarMensaje)

module.exports = router
