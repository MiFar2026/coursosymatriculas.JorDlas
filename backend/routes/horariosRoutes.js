
const express = require('express');
const router = express.Router();


const {
  getGrupos,
  getHorarios,
  guardarHorarios,
  getHorariosAlumno
} = require('../controllers/horariosController');

const autenticarAlumno = require('../middlewares/autenticarAlumno');


// Tu middleware existente está en la carpeta middlewares
const authAdmin = require('../middlewares/authAdmin');

router.get('/grupos', getGrupos);
router.get('/', getHorarios);
router.get('/mi-horario', autenticarAlumno, getHorariosAlumno);
router.put('/', authAdmin, guardarHorarios);

module.exports = router;
