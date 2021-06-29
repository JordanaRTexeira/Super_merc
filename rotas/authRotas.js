const express = require('express');
const rotas = express.Router();
const funcionarioController = require('../controller/funcionarioController')

rotas.post('/auth', funcionarioController.validarFuncionario)


module.exports = rotas