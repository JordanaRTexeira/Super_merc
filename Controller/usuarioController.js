const conexao = require('../config/conexaoBD')
const jwt = require('jsonwebtoken')
const usuarioRepository = require('../repository/usuarioRepository')


exports.listarUsuario = (req, res) => {
    usuarioRepository.listarUsuario((erro, usuarios) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
            // ERRO 500 - O código 500 é um status de erro HTTP que indica uma dificuldade de processamento do servidor, 
            //a partir de uma incompatibilidade ou configuração incorreta em uma aplicação de um site.
        } else {
            res.json(usuarios)
        }
    })
}

exports.inserirUsuario = (req, res) =>{
    const usuarios = req.body; 
    const sql = "INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)"
    conexao.query(sql, [usuarios.nome, usuarios.email , usuarios.senha],
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            usuarios.id = rows.insertId;
            res.status(201).json(usuarios)
            //Status 201 é utilizado como resposta de sucesso, 
            //indica que a requisição foi bem sucedida e que um novo recurso foi criado.
        }
    })
}

exports.buscarPorIdUsuario = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
    conexao.query(sql, [id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            if(rows && rows.length > 0){
                res.json(rows[0])
            } else{ 
                res.status(404).json({"msg":"usuario nao encontrado"})
            //Status 404 é a mensagem que aparece quando o visitante tenta acessar 
            //uma página que não existe, que está com a URL errada ou que foi removida do site.

            }
        }
    })
}

exports.buscarPorEmailUsuario = (req, res) => {    
    if(req.query && req.query.email){
        const email = req.query.email;
        usuarioRepository.buscarPorEmailUsuario(email, (err,usuarios) => {
            if(err){
                res.status(err.status).json(err);
            } else {
                res.json(usuarios);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar email."})
        //Status 400 indica que o servidor não pode ou não processará a solicitação devido a algo que é percebido 
        //como um erro do cliente (por exemplo, sintaxe de solicitação malformada, enquadramento de mensagem de solicitação inválido 
    }
}

exports.atualizarUsuario = (req, res) => {
    const id_usuario = req.params.id;
    const usuarios = req.body;
    const sql = `UPDATE usuarios SET nome = ?, email = ?,  senha = ? WHERE id_usuario = ?`;
    conexao.query(sql, [usuarios.nome, usuarios.email, usuarios.senha, id_usuario], 
        (erro) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            usuarios.id_usuario = +id_usuario; 
            res.json(usuarios);
        }
    })
}

exports.deletarUsuario = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM usuarios WHERE id_usuario = ?`;
    conexao.query(sql, [id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            if(rows.affectedRows)
            res.json({"msg": `Usuário ${id} removido com sucesso`});
        }
    })
}

exports.validarUsuario = (req, res) => {
    if(req.body && req.body.email && req.body.senha){
        const email = req.body.email;
        const senha = req.body.senha;
        usuarioRepository.buscarPorEmailUsuario(email, (err,usuarios) => {
            if(err){
                if(err.status == 404){
                    const erro = {
                        status: 401,
                        msg: "Email invalido"
                    }
                    //Status 401 indica que a solicitação não foi aplicada 
                    //porque não possui credenciais de autenticação válidas para o recurso de destino.
                    res.status(erro.status).json(erro);
                }
                else {
                    res.status(err.status).json(err);
                }
            }
            else {
                if(usuarios.senha == senha){
                    const token = jwt.sign({
                        id: usuarios.id_usuario,
                        nome: usuarios.nome
                    }, "Sen@cr5", {expiresIn: "3h"});
                    res.status(201).json({"token":token});
                }
                else {
                    const erro = {
                        status: 401,
                        msg: "Senha invalida"
                    }
                    res.status(erro.status).json(erro);
                }
            }
        })
    }
    else {
        const erro = {
            status: 400,
            msg: "Usuario ou senha inexistentes"
        }
        res.status(erro.status).json(erro);
    }
}

exports.validarToken = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(!token){
        const error = { 
            status: 403,
            msg: "Nao tem token de acesso" //Status 403 significa que você não tem permissão para acessar determinada página.
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
                console.log("Id do Usuário: "+payload.id);
                next();
            }
        })
    }
}