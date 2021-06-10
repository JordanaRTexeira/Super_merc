const conexao = require('../config/conexaoBD')
const jwt = require('jsonwebtoken')
const produtoRepository = require('../repository/produtoRepository')


exports.listar = (req, res) => {
    produtoRepository.listar((erro, produtos) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        // ERRO 500 - O código 500 é um status de erro HTTP que indica uma dificuldade de processamento do servidor, 
        //a partir de uma incompatibilidade ou configuração incorreta em uma aplicação de um site.
        } else {
            res.json(produtos)
        }
    })
}

exports.inserir = (req, res) => {
    const produto = req.body;
    produtoRepository.inserir(produto, (erro, produtoSalvo) =>{
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            res.status(201).json(produtoSalvo)
            //Status 201 é utilizado como resposta de sucesso, 
            //indica que a requisição foi bem sucedida e que um novo recurso foi criado.
        }
    })
}
    
exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    if(isNaN(id)){
        const error = {
            status: 400,
            msg: "Id deve ser um número"
        }
        //Status 400 indica que o servidor não pode ou não processará a solicitação devido a algo que é percebido 
        //como um erro do cliente (por exemplo, sintaxe de solicitação malformada, enquadramento de mensagem de solicitação inválido 
        res.status(error.status).json(error)
    } else {
        produtoRepository.buscarPorId(id, (erro, produto) =>{
            if(erro){
                res.status(erro.status).json(erro)
            } else {
                res.json(produto)
            }
        })
    }
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const produto = req.body;
    const sql = "UPDATE produtos SET nome=?, preco=?, categoria=?, marca=? WHERE id_produto=?";
    conexao.query(sql, [produto.nome, produto.preco, produto.categoria, produto.marca, id],(erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            produto.id = + id; 
            res.json(produto);
        }
    })
}

exports.deletar = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM produtos WHERE id_produto = ?`;
    conexao.query(sql, [id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            if(rows.affectedRows)
            res.json({"msg": `Produto ${id} removido com sucesso`});
        }
    })
}


