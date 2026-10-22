
const express = require('express')
const router = express.Router()

const alumnadoRoutes = require('./alumnadoRoutes')
// const clasesRoutes = require('./clasesRoutes')
const matriculasRoutes = require('./matriculasRoutes')
const profesoresRoutes = require('./profesoresRoutes')
const cursosRoutes = require('./cursosRoutes')
const escuelasRoutes = require('./escuelasRoutes')
const adminRoutes = require('./adminRoutes')
const avisosRoutes = require('./avisosRoutes')
const foroProfesoresRoutes = require('./foroProfesoresRoutes')


// Rutas de la API de Cursos Generales
router.use('/alumnado', alumnadoRoutes)
// router.use('/clases', clasesRoutes)
router.use('/matriculas', matriculasRoutes)
router.use('/profesores', profesoresRoutes)
router.use('/cursos', cursosRoutes)
router.use('/escuelas', escuelasRoutes)
router.use('/admin', adminRoutes)
router.use('/avisos', avisosRoutes)
router.use('/foro-profesores', foroProfesoresRoutes)

module.exports = router
