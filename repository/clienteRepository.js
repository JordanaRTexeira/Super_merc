const conexao = require('../config/conexaoBD')

exports.listar = (callback) => {
    const sql = "SELECT * FROM usuarios";

    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}

exports.inserir = (usuario, callback) => {   
    const sql = "INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)"

    conexao.query(sql, [usuario.nome, usuario.email, usuario.senha],
        (erro, rows) => {
            if(erro){
                callback(erro, null)
            }
            else {
                usuario.id = rows.insertId;
                callback(null, usuario)
            }
    })    
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
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
                    msg: "Usuario nao encontrado"
                }
                callback(error, null);
            }
        }
    })
}

exports.deletar = (id, callback) => {
    const sql = `DELETE FROM usuarios WHERE id_usuario = ?`;
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