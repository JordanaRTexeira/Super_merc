const express = require('express');
const rotas = express.Router();
const produto_Controller = require('../Controller/produtoController')

rotas.get('/', produto_Controller.listar)
rotas.post('/', produto_Controller.inserir)
rotas.get('/:id', produto_Controller.buscarPorId)
rotas.put('/:id', produto_Controller.atualizar)
rotas.delete('/:id', produto_Controller.deletar)

module.exports = rotas