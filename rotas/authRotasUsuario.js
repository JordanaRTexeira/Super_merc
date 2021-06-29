const express = require('express');
const rotas = express.Router();
const usuarioController = require('../controller/usuarioController')

rotas.post('/authUsuario', usuarioController.validarUsuario)

module.exports = rotas