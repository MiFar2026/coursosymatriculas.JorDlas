const express = require('express')

const {
    getMatriculas,
    createMatricula,
    deleteMatricula
} = require('../controllers/matriculasController')

const router = express.Router()

router.get('/', getMatriculas)
router.post('/', createMatricula)
router.delete('/:id', deleteMatricula)

module.exports = router