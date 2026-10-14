
const express = require('express')
const cors = require('cors')

const app = express()

const routes = require('./routes/routes.js')
const voluntariosRoutes = require('./routes/voluntariosRoutes.js')

console.log('app.js cargado')
console.log('Rutas de voluntariado cargadas')

app.use(cors())
app.use(express.json({ limit: '32kb' }))

app.get('/', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'API Cursos Generales funcionando correctamente'
  })
})

// Rutas de voluntariado
app.use('/api/voluntarios', voluntariosRoutes)

// Rutas existentes
app.use('/api', routes)

// 404: siempre al final
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Ruta no encontrada'
  })
})

module.exports = app
