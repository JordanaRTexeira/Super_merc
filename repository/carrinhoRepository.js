const conexao = require('../config/conexaoBD')

exports.listarProdutosCarrinho = (callback) => {
        const sql = "SELECT * FROM produtos";
        conexao.query(sql, (erro, rows) => {
            if(erro){            
                callback(erro,null);
            }
            else {
                callback(null, rows);
            }
        })
    }


exports.inserirProdutoCarrinho = (carrinho, callback) => {   
    const sql = "INSERT INTO carrinhos(idProduto, nomeProduto, preco, marca, idUsuario, nomeUsuario, dataPedido) VALUES (?, ?, ?, ?, ?, ?, ?)"
    conexao.query(sql, [carrinho.idProduto, carrinho.nomeProduto, carrinho.preco, carrinho.marca, carrinho.idUsuario, carrinho.nomeUsuario, carrinho.dataPedido],
        (erro, rows) => {
            if(erro){
                callback(erro, null)
            }
            else {
                carrinho.id_carrinho = rows.insertId;
                callback(null, carrinho)
            }
    })    
}