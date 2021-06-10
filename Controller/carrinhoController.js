const conexao = require('../config/conexaoBD')
const jwt = require('jsonwebtoken')
const carrinhoRepository = require('../repository/carrinhoRepository')

exports.listarProdutosCarrinho = (req, res) => {
    carrinhoRepository.listarProdutosCarrinho((erro, produtos) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            res.json(produtos)
        }
    })
}

exports.inserirProdutoCarrinho = (req, res) =>{
    const dado = req.body;
    carrinhoRepository.inserirProdutoCarrinho(dado, (erro, dadoSalvo) =>{
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            res.status(201).json(dadoSalvo)
        }
    })
}

exports.buscarPorIdUsuarioCarrinho = (req, res) => {
    const idUsuario = req.params.id;
    const sql = "SELECT * FROM carrinhos WHERE idUsuario = ?";
    conexao.query(sql, [idUsuario], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            if(rows && rows.length > 0){
                res.json(rows[0])
            } else{ 
                res.status(404).json({"msg":"Usuário não encontrado"})
            }
        }
    })
}

exports.atualizarCarrinho = (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    const sql = "UPDATE carrinhos SET idProduto = ?, nomeProduto = ?, preco = ?, marca = ?, idUsuario = ?, nomeUsuario = ?, dataPedido  = ? WHERE idCarrinho = ?"
    conexao.query(sql, [dados.idProduto, dados.nomeProduto, dados.preco, dados.marca, dados.idUsuario, dados.nomeUsuario, dados.dataPedido, id], (erro) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            dados.id = +id; 
            res.json(dados);
        }
    })
}

exports.deletarCarrinho = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM carrinhos WHERE idCarrinho =?`;
    conexao.query(sql, [id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            if(rows.affectedRows)
            res.json({"msg": `Carrinho ${id} removido com sucesso`});
        }
    })
}

exports.validarToken = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(!token){
        const error = { 
            status: 403,
            msg: "Não tem token de acesso"
        }
        res.status(error.status).json(error);
    }
    else {
        jwt.verify(token, "Sen@cr5", (err, payload) => {
            if(err){
                const error = { 
                    status: 403,
                    msg: "Token invalido"
                }
                res.status(error.status).json(error);        
            }
            else{
                console.log("Id do Usuario: "+payload.id);
                next();
            }
        })
    }
}