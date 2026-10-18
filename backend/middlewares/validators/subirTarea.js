const multer = require('multer')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const carpetaEntregas = path.resolve(
  process.cwd(),
  'private_uploads',
  'tareas'
)

// Crear la carpeta si todavía no existe.
fs.mkdirSync(carpetaEntregas, { recursive: true })

const extensionesPermitidas = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.pdf',
  '.doc',
  '.docx',
  '.mp3',
  '.mp4'
])

const tiposMimePermitidos = new Set([
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'audio/mpeg',
  'video/mp4'
])

const almacenamiento = multer.diskStorage({
  destination(req, archivo, callback) {
    callback(null, carpetaEntregas)
  },

  filename(req, archivo, callback) {
    const extension = path.extname(archivo.originalname).toLowerCase()
    callback(null, `${crypto.randomUUID()}${extension}`)
  }
})

const subirTarea = multer({
  storage: almacenamiento,

  limits: {
    fileSize: 25 * 1024 * 1024,
    files: 10,
    fields: 2
  },

  fileFilter(req, archivo, callback) {
    const extension = path.extname(archivo.originalname).toLowerCase()
    const tipoMime = archivo.mimetype.toLowerCase()

    if (
      !extensionesPermitidas.has(extension) ||
      !tiposMimePermitidos.has(tipoMime)
    ) {
      return callback(
        new Error('Tipo de archivo no permitido.')
      )
    }

    callback(null, true)
  }
})

module.exports = subirTarea