const express = require('express');
const rotas = express.Router();
const usuarioController = require('../controller/usuarioController')

rotas.get('/', usuarioController.listarUsuario)
rotas.post('/', usuarioController.inserirUsuario)
rotas.get('/busca', usuarioController.buscarPorEmailUsuario)
rotas.get('/:id', usuarioController.buscarPorIdUsuario)
rotas.put('/:id', usuarioController.atualizarUsuario)
rotas.delete('/:id', usuarioController.deletarUsuario)


module.exports = rotas