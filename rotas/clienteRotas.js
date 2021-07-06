const express = require('express');
const rotas = express.Router();
const cliente_Controller = require('../Controller/clienteController')

rotas.get('/', cliente_Controller.listar)
rotas.post('/', cliente_Controller.inserir)
rotas.get('/:id', cliente_Controller.buscarPorId)
rotas.put('/:id', cliente_Controller.atualizar)
rotas.delete('/:id', cliente_Controller.deletar)

module.exports = rotas