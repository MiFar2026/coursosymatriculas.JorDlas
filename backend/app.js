
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();

const routes = require('./routes/routes.js');
const perfilAlumnoRoutes = require('./routes/perfilAlumnoRoutes');

const voluntariosRoutes = require('./routes/voluntariosRoutes.js');
const horariosRoutes = require('./routes/horariosRoutes.js');
const accesoAlumnoRoutes = require('./routes/accesoAlumnoRoutes')
const tareasRoutes = require('./routes/tareasRoutes')
const accesoProfesorRoutes = require('./routes/accesoProfesorRoutes')
const foroAlumnosRoutes = require('./routes/foroAlumnosRoutes')


console.log('app.js cargado');

const origenesPermitidos = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
  'http://localhost:5178'
]

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin Origin, por ejemplo desde algunas herramientas locales.
    if (!origin || origenesPermitidos.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Origen no permitido por CORS'))
  },
  credentials: true
}))

app.use(express.json({ limit: '32kb' }))
app.use(cookieParser())


app.get('/', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'API Cursos Generales funcionando correctamente'
  });
});

// Rutas de horarios
app.use('/api/horarios', horariosRoutes);

// Rutas de voluntariado
app.use('/api/voluntarios', voluntariosRoutes);

//Ruta de acceso alumno

app.use('/api/acceso-alumno', accesoAlumnoRoutes);


// Rutas existentes
app.use('/api', routes);
app.use('/api/tareas', tareasRoutes)

app.use('/api/perfil-alumno', perfilAlumnoRoutes);
app.use('/api/acceso-profesor', accesoProfesorRoutes)
app.use('/api/foro-alumnos', foroAlumnosRoutes)

// 404: siempre al final
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Ruta no encontrada'
  });
});

module.exports = app;