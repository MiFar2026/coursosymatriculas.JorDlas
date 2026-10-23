
const express = require('express')
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const router = express.Router()
const authProfesor = require('../middlewares/authProfesor')

const {
    getMiPerfilProfesor,
    actualizarDatosProfesor,
    actualizarFotoProfesor
} = require('../controllers/perfilProfesorController')

const carpetaFotos = path.join(
    __dirname,
    '..',
    'uploads',
    'fotos',
    'tutores'
)

const almacenamiento = multer.diskStorage({
    destination: (req, file, callback) => {
        const fs = require('fs')

        fs.mkdir(carpetaFotos, { recursive: true }, (error) => {
            callback(error, carpetaFotos)
        })
    },

    filename: (req, file, callback) => {
        const extensionPorTipo = {
            'image/jpeg': '.jpg',
            'image/png': '.png',
            'image/webp': '.webp'
        }

        const extension = extensionPorTipo[file.mimetype]

        if (!extension) {
            return callback(new Error('Formato de imagen no permitido.'))
        }

        callback(
            null,
            `profesor-${req.profesor.id}-${crypto.randomBytes(12).toString('hex')}${extension}`
        )
    }
})

const subirFoto = multer({
    storage: almacenamiento,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        const tiposPermitidos = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ]

        if (!tiposPermitidos.includes(file.mimetype)) {
            return callback(
                new Error('La foto debe ser JPG, PNG o WEBP.')
            )
        }

        callback(null, true)
    }
})

router.use(authProfesor)

router.get('/me', getMiPerfilProfesor)
router.put('/me', actualizarDatosProfesor)
router.post('/foto', subirFoto.single('foto'), actualizarFotoProfesor)

// Devolver errores de subida con un mensaje controlado.
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        const mensaje = error.code === 'LIMIT_FILE_SIZE'
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
            mensaje: error.message || 'Error al subir la imagen.'
        })
    }

    next()
})

module.exports = router
