
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const LIMITE_ARCHIVO = 20 * 1024 * 1024

const extensionesPermitidas = new Set([
  '.pdf',
  '.doc',
  '.docx',
  '.odt',
  '.txt',
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.mp3',
  '.wav',
  '.ogg',
  '.mp4',
  '.webm',
  '.ppt',
  '.pptx',
  '.xls',
  '.xlsx',
  '.zip'
])

const tiposMimePermitidos = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.oasis.opendocument.text',
  'text/plain',
  'image/jpeg',
  'image/png',
  'image/webp',
  'audio/mpeg',
  'audio/wav',
  'audio/x-wav',
  'audio/ogg',
  'video/mp4',
  'video/webm',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'application/x-zip-compressed',
  'application/octet-stream'
])

const almacenamiento = multer.diskStorage({
  destination(req, file, callback) {
    const escuelaId = Number(req.profesor?.escuelaId)

    let carpetaEscuela

    if (escuelaId === 1) {
      carpetaEscuela = 'joanmiro'
    } else if (escuelaId === 2) {
      carpetaEscuela = 'ateneu'
    } else {
      return callback(new Error('La escuela del profesor no es válida.'))
    }

   const carpeta = path.join(
  __dirname,
  '..',
  '..',
  'uploads',
  'recursos',
  carpetaEscuela
)

    fs.mkdir(carpeta, { recursive: true }, error => {
      if (error) return callback(error)
      callback(null, carpeta)
    })
  },

  filename(req, file, callback) {
    const extension = path.extname(file.originalname).toLowerCase()
    const nombre = `recurso-${Date.now()}-${require('crypto').randomUUID()}${extension}`

    callback(null, nombre)
  }
})

const subirRecurso = multer({
  storage: almacenamiento,
  limits: {
    fileSize: LIMITE_ARCHIVO,
    files: 1
  },
  fileFilter(req, file, callback) {
    const extension = path.extname(file.originalname).toLowerCase()

    if (!extensionesPermitidas.has(extension)) {
      return callback(
        new Error('El tipo de archivo no está permitido.')
      )
    }

    if (!tiposMimePermitidos.has(file.mimetype)) {
      return callback(
        new Error('El formato del archivo no está permitido.')
      )
    }

    callback(null, true)
  }
}).single('archivo')

module.exports = subirRecurso
