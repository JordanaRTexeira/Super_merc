const conexao = require('../config/conexaoBD')

exports.listar = (callback) => {
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

exports.inserir = (produto, callback) => {   
    const sql = "INSERT INTO produtos(nome, preco, categoria, marca) VALUES (?, ?, ?, ?)"

    conexao.query(sql, [produto.nome, produto.preco, produto.categoria, produto.marca],
        (erro, rows) => {
            if(erro){
                callback(erro, null)
            }
            else {
                produto.id = rows.insertId;
                callback(null, produto)
            }
    })    
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM produtos WHERE id_produto = ?";
    conexao.query(sql, [id], (err, rows) => {
        if(err){
            const error = {
                status: 500,
                msg: err
            }
            callback(error, null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows[0])
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "Produto nao encontrado"
                }
                callback(error, null);
            }
        }
    })
}

exports.deletar = (id, callback) => {
    const sql = `DELETE FROM produtos WHERE id_produto = ?`;
    conexao.query(sql, [id], (err, rows) => {
        if(err){
            const error = {
                status: 500,
                msg: err
            }
            callback(err, null);
        }
        else {
            if(rows.affectedRows){
                callback(null, id);
            }
            else {
                const error = {
                    status: 500,
                    msg: err
                }
                callback(err, null);    
            }
        }
    })            
}