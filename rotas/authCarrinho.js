const express = require('express');
const rotas = express.Router();
const carrinhoController = require('../controller/carrinhoController')

rotas.post('/', carrinhoController.validarToken)

module.exports = rotas