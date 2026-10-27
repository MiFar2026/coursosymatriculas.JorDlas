
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()

// =====================================================
// IMPORTACIÓN DE RUTAS
// =====================================================

const adminRoutes = require('./routes/adminRoutes')
const horariosRoutes = require('./routes/horariosRoutes.js')
const voluntariosRoutes = require('./routes/voluntariosRoutes.js')
const accesoAlumnoRoutes = require('./routes/accesoAlumnoRoutes')
const accesoProfesorRoutes = require('./routes/accesoProfesorRoutes')
const tareasRoutes = require('./routes/tareasRoutes')
const tareasProfesorRoutes = require('./routes/tareasProfesorRoutes')
const perfilAlumnoRoutes = require('./routes/perfilAlumnoRoutes')
const perfilProfesorRoutes = require('./routes/perfilProfesorRoutes')
const actividadesRoutes = require('./routes/actividadesRoutes')
const foroAlumnosRoutes = require('./routes/foroAlumnosRoutes')
const foroProfesoresRoutes = require('./routes/foroProfesoresRoutes')
const routes = require('./routes/routes.js')

// =====================================================
// COMPROBACIÓN INICIAL
// =====================================================

console.log('app.js cargado')

console.log('CARGADO tareasProfesorRoutes:', {
  tipo: typeof tareasProfesorRoutes,
  rutas: tareasProfesorRoutes.stack.map(r => r.route?.path)
})

// =====================================================
// CORS
// =====================================================

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

// =====================================================
// MIDDLEWARE GENERAL
// =====================================================

app.use(express.json({ limit: '32kb' }))
app.use(cookieParser())

// Archivos estáticos: fotos guardadas en backend/uploads.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// =====================================================
// COMPROBAR QUE LA API FUNCIONA
// =====================================================

app.get('/', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'API Cursos Generales funcionando correctamente'
  })
})

// =====================================================
// RUTAS ESPECÍFICAS
// =====================================================

// Administración: antes de la ruta general /api.
app.use('/api/admin', adminRoutes)
console.log('RUTA ADMINISTRATIVA REGISTRADA')

// Horarios.
app.use('/api/horarios', horariosRoutes)

// Voluntariado.
app.use('/api/voluntarios', voluntariosRoutes)

// Acceso del alumnado.
app.use('/api/acceso-alumno', accesoAlumnoRoutes)

// Acceso del profesorado.
app.use('/api/acceso-profesor', accesoProfesorRoutes)

// Tareas y actividades.
app.use('/api/tareas', tareasRoutes)
app.use('/api/tareas-profesor', tareasProfesorRoutes)
app.use('/api/actividades', actividadesRoutes)

// Perfiles.
app.use('/api/perfil-alumno', perfilAlumnoRoutes)
app.use('/api/perfil-profesor', perfilProfesorRoutes)

// Foros.
app.use('/api/foro-alumnos', foroAlumnosRoutes)
app.use('/api/foro-profesores', foroProfesoresRoutes)

// =====================================================
// RUTAS GENERALES
// Deben ir después de las rutas específicas.
// =====================================================

app.use('/api', routes)

// =====================================================
// 404: SIEMPRE AL FINAL
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Ruta no encontrada'
  })
})

module.exports = app
