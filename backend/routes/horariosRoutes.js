
const express = require('express');
const router = express.Router();

const {
  getGrupos,
  getHorarios,
  guardarHorarios
} = require('../controllers/horariosController');

// Tu middleware existente está en la carpeta middlewares
const authAdmin = require('../middlewares/authAdmin');

router.get('/grupos', getGrupos);
router.get('/', getHorarios);
router.put('/', authAdmin, guardarHorarios);

module.exports = router;
