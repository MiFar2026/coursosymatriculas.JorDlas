
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()

const routes = require('./routes/routes.js')
const perfilAlumnoRoutes = require('./routes/perfilAlumnoRoutes')
const voluntariosRoutes = require('./routes/voluntariosRoutes.js')
const horariosRoutes = require('./routes/horariosRoutes.js')
const accesoAlumnoRoutes = require('./routes/accesoAlumnoRoutes')
const tareasRoutes = require('./routes/tareasRoutes')
const accesoProfesorRoutes = require('./routes/accesoProfesorRoutes')
const foroAlumnosRoutes = require('./routes/foroAlumnosRoutes')
const foroProfesoresRoutes = require('./routes/foroProfesoresRoutes')
const perfilProfesorRoutes = require('./routes/perfilProfesorRoutes')
const actividadesRoutes = require('./routes/actividadesRoutes')

console.log('app.js cargado')

const origenesPermitidos = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
  'http://localhost:5178'
]

app.use(cors({
  origin(origin, callback) {
    // Permitir peticiones sin Origin y los frontends locales autorizados.
    if (!origin || origenesPermitidos.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Origen no permitido por CORS'))
  },
  credentials: true
}))

app.use(express.json({ limit: '32kb' }))
app.use(cookieParser())

// Archivos estáticos: fotos guardadas en backend/uploads.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Comprobar que la API funciona.
app.get('/', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'API Cursos Generales funcionando correctamente'
  })
})

// Rutas de horarios.
app.use('/api/horarios', horariosRoutes)

// Rutas de voluntariado.
app.use('/api/voluntarios', voluntariosRoutes)

// Acceso del alumnado.
app.use('/api/acceso-alumno', accesoAlumnoRoutes)

// Rutas generales existentes.
app.use('/api', routes)
app.use('/api/tareas', tareasRoutes)
app.use('/api/perfil-alumno', perfilAlumnoRoutes)

// Acceso del profesorado.
app.use('/api/acceso-profesor', accesoProfesorRoutes)


//tareas, actividades

app.use('/api/actividades', actividadesRoutes)

// Foros.
app.use('/api/foro-alumnos', foroAlumnosRoutes)
app.use('/api/foro-profesores', foroProfesoresRoutes)

// Perfil y foto del profesorado.
// Se registra una sola vez.
app.use('/api/perfil-profesor', perfilProfesorRoutes)

// 404: siempre al final, después de todas las rutas.
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Ruta no encontrada'
  })
})


module.exports = app
