const express = require('express');
const router = express.Router();

const {
    getMiPerfilAlumno
} = require('../controllers/perfilAlumnoController');

const autenticarAlumno = require('../middlewares/autenticarAlumno');

router.get('/me', autenticarAlumno, getMiPerfilAlumno);

module.exports = router;