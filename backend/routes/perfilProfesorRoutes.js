
const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const authProfesor = require('../middlewares/authProfesor')

const {
  getMiPerfilProfesor,
  actualizarDatosProfesor,
  actualizarFotoProfesor
} = require('../controllers/perfilProfesorController')

const router = express.Router()

const carpetaFotos = path.join(
  __dirname,
  '..',
  'uploads',
  'fotos',
  'tutores'
)

const extensionesPermitidas = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp'
}

const almacenamiento = multer.diskStorage({
  destination: (req, file, callback) => {
    fs.mkdir(carpetaFotos, { recursive: true }, (error) => {
      callback(error, carpetaFotos)
    })
  },

  filename: (req, file, callback) => {
    const extension = extensionesPermitidas[file.mimetype]

    if (!extension) {
      return callback(
        new Error('La foto debe ser JPG, PNG o WEBP.')
      )
    }

    const profesorId = req.profesor?.id

    if (!profesorId) {
      return callback(
        new Error('No se ha identificado al profesor.')
      )
    }

    const nombre = `profesor-${profesorId}-${crypto
      .randomBytes(12)
      .toString('hex')}${extension}`

    callback(null, nombre)
  }
})

const subirFoto = multer({
  storage: almacenamiento,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    if (!extensionesPermitidas[file.mimetype]) {
      return callback(
        new Error('La foto debe ser JPG, PNG o WEBP.')
      )
    }

    callback(null, true)
  }
})

// Todas las rutas requieren autenticación de profesor.
router.use(authProfesor)

router.get('/me', getMiPerfilProfesor)

router.put('/me', actualizarDatosProfesor)

router.post(
  '/foto',
  subirFoto.single('foto'),
  actualizarFotoProfesor
)

// Middleware de gestión de errores.
router.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  if (error instanceof multer.MulterError) {
    const mensaje =
      error.code === 'LIMIT_FILE_SIZE'
        ? 'La imagen no puede superar los 5 MB.'
        : 'No se ha podido procesar la imagen.'

    return res.status(400).json({
      ok: false,
      mensaje
    })
  }

  if (error) {
    return res.status(400).json({
      ok: false,
      mensaje: error.message || 'Se ha producido un error.'
    })
  }

  next()
})

module.exports = router
