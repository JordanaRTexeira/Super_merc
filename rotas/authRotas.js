const express = require('express');
const rotas = express.Router();
const funcionarioController = require('../controller/funcionarioController')

rotas.post('/', funcionarioController.validarUsuario)

module.exports = rotas