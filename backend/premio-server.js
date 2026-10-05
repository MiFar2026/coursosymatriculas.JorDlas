require('dotenv').config()

const express = require('express')
const cors = require('cors')

const premioRoutes = require('./routes/premioRoutes')

const app = express()

const PORT = process.env.PORT || 5555


// ========================================
// MIDDLEWARES
// ========================================

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// ========================================
// RUTAS DEL PREMIO
// ========================================

app.use(
  '/api/participaciones',
  premioRoutes
)


// ========================================
// ARCHIVOS SUBIDOS
// ========================================

app.use(
  '/uploads',
  express.static('uploads')
)


// ========================================
// RUTA PRINCIPAL
// ========================================

app.get('/', (req, res) => {

  res.json({
    ok: true,
    mensaje: 'Servidor del Premio funcionando correctamente',
    puerto: PORT
  })

})


// ========================================
// MANEJO DE ERRORES
// ========================================

app.use((err, req, res, next) => {

  console.error('ERROR DEL SERVIDOR:')
  console.error(err)

  res.status(500).json({
    ok: false,
    mensaje: 'Ha ocurrido un error en el servidor.'
  })

})


// ========================================
// ARRANCAR SERVIDOR
// ========================================

app.listen(PORT, () => {

  console.log('')
  console.log('========================================')
  console.log(' SERVIDOR DEL PREMIO')
  console.log('========================================')
  console.log(` http://localhost:${PORT}`)
  console.log('========================================')
  console.log('')

})