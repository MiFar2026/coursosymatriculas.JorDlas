
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const carpeta = path.resolve(
  process.cwd(),
  'private_uploads',
  'resultados'
)

fs.mkdirSync(carpeta, { recursive: true })

const tiposPermitidos = new Map([
  ['.jpg', ['image/jpeg']],
  ['.jpeg', ['image/jpeg']],
  ['.png', ['image/png']],
  ['.pdf', ['application/pdf']],
  ['.doc', ['application/msword']],
  [
    '.docx',
    ['application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  ],
  ['.mp3', ['audio/mpeg']],
  ['.mp4', ['video/mp4']]
])

const almacenamiento = multer.diskStorage({
  destination(req, archivo, callback) {
    callback(null, carpeta)
  },

  filename(req, archivo, callback) {
    const extension = path.extname(archivo.originalname).toLowerCase()
    callback(null, `${crypto.randomUUID()}${extension}`)
  }
})

module.exports = multer({
  storage: almacenamiento,

  limits: {
    fileSize: 25 * 1024 * 1024,
    files: 1,
    fields: 5
  },

  fileFilter(req, archivo, callback) {
    const extension = path.extname(archivo.originalname).toLowerCase()
    const mime = archivo.mimetype.toLowerCase()
    const mimes = tiposPermitidos.get(extension)

    if (!mimes || !mimes.includes(mime)) {
      return callback(new Error('Tipo de archivo no permitido.'))
    }

    callback(null, true)
  }
})
