const express = require('express');
const router = express.Router();

const {
    getMiPerfilAlumno,
    actualizarMiPerfilAlumno
} = require('../controllers/perfilAlumnoController');

const autenticarAlumno = require('../middlewares/autenticarAlumno');

router.get('/me', autenticarAlumno, getMiPerfilAlumno);
router.patch('/me', autenticarAlumno, actualizarMiPerfilAlumno);

module.exports = router;