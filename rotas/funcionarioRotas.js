const express = require('express');
const rotas = express.Router();
const funcionarioController = require('../controller/funcionarioController')

rotas.get('/', funcionarioController.listar)
rotas.post('/', funcionarioController.inserir)
rotas.get('/busca', funcionarioController.buscarPorEmail)
rotas.get('/:id', funcionarioController.buscarPorId)
rotas.put('/:id', funcionarioController.atualizar)
rotas.delete('/:id', funcionarioController.deletar)


module.exports = rotas