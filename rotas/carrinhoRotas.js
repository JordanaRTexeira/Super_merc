const express = require('express');
const rotas = express.Router();
const carrinhoController = require('../controller/carrinhoController')

rotas.get('/', carrinhoController.listarProdutosCarrinho)
rotas.post('/', carrinhoController.inserirProdutoCarrinho)
rotas.get('/:id', carrinhoController.buscarPorIdUsuarioCarrinho)
rotas.put('/:id', carrinhoController.atualizarCarrinho)
rotas.delete('/:id', carrinhoController.deletarCarrinho)


module.exports = rotas