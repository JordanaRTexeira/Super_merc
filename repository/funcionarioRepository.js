const conexao = require('../config/conexaoBD')

exports.listar = (callback) => {
    const sql = "SELECT * FROM funcionarios";
    conexao.query(sql, (erro, rows) => {
        if(erro){            
            callback(erro,null);
        }
        else {
            callback(null, rows);
        }
    })
}

exports.buscarPorEmail = (email, callback) => {
    const sql = "SELECT * FROM funcionarios where email = ?";
    conexao.query(sql, [email], (err, rows) => {
        if(err){            
            const error = {
                status: 500,
                msg: err
            }
            callback(error,null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows[0]);
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "usuario nao encontrado"
                }
                callback(error,null);
            }
        }
    })
}