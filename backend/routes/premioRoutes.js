const express = require('express')

const router = express.Router()

const {
  crearParticipacion
} = require('../controllers/premioController')


// ========================================
// POST /api/participaciones
// ========================================

router.post(
  '/',
  crearParticipacion
)


module.exports = router