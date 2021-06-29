const conexao = require('../config/conexaoBD')
const jwt = require('jsonwebtoken')
const funcionarioRepository = require('../repository/funcionarioRepository')


exports.listar = (req, res) => {
    funcionarioRepository.listar((erro,funcionarios) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
            // ERRO 500 - O código 500 é um status de erro HTTP que indica uma dificuldade de processamento do servidor, 
            //a partir de uma incompatibilidade ou configuração incorreta em uma aplicação de um site.
        } else {
            res.json(funcionarios)
        }
    })
}

exports.inserir = (req, res) =>{
    const funcionarios = req.body; 
    const sql = "INSERT INTO funcionarios(nome, email, senha, endereco, dataNasc, cpf, cargo, setor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    conexao.query(sql, [funcionarios.nome, funcionarios.email , funcionarios.senha, funcionarios.endereco, 
        funcionarios.dataNasc, funcionarios.cpf, funcionarios.cargo, funcionarios.setor],
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            funcionarios.id = rows.insertId;
            res.status(201).json(funcionarios) 
            //Status 201 é utilizado como resposta de sucesso, 
            //indica que a requisição foi bem sucedida e que um novo recurso foi criado.

        }
    })
}

exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM funcionarios WHERE id_funcionario = ?";
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

exports.buscarPorEmail = (req, res) => {    
    if(req.query && req.query.email){
        const email = req.query.email;
        funcionarioRepository.buscarPorEmail(email, (err,funcionarios) => {
            if(err){
                res.status(err.status).json(err);
            } else {
                res.json(funcionarios);
            }
        });
    }
    else{
        res.status(400).json({"status":400, "msg":"Necessario especificar email."})
        //Status 400 indica que o servidor não pode ou não processará a solicitação devido a algo que é percebido 
        //como um erro do cliente (por exemplo, sintaxe de solicitação malformada, enquadramento de mensagem de solicitação inválido 
    }
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const funcionario = req.body;
    const sql = `UPDATE funcionarios SET nome=?, email=?, senha=?, endereco=?, dataNasc=?, cpf=?, 
    cargo=?, setor=? WHERE id_funcionario=?`;
    conexao.query(sql, [funcionario.nome, funcionario.email, funcionario.senha, funcionario.endereco, 
        funcionario.dataNasc, funcionario.cpf, funcionario.cargo, funcionario.setor, id], 
        (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            funcionario.id = +id; 
            res.json(funcionario);
        }
    })
}

exports.deletar = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM funcionarios WHERE id_funcionario = ?`;
    conexao.query(sql, [id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            if(rows.affectedRows)
            res.json({"msg": `Funcionario ${id} removido com sucesso`});
        }
    })
}

exports.validarFuncionario = (req, res) => {
    if(req.body && req.body.email && req.body.senha){
        const email = req.body.email;
        const senha = req.body.senha;
        funcionarioRepository.buscarPorEmail(email, (err,funcionarios) => {
            if(err){
                if(err.status == 404){
                    const erro = {
                        status: 401,
                        msg: "Email invalido"
                    //Status 401 indica que a solicitação não foi aplicada 
                    //porque não possui credenciais de autenticação válidas para o recurso de destino.
                    }
                    res.status(erro.status).json(erro);
                }
                else {
                    res.status(err.status).json(err);
                }
            }
            else {
                if(funcionarios.senha == senha){
                    const token = jwt.sign({
                        id: funcionarios.id_funcionario,
                        nome: funcionarios.nome
                    }, "Sen@cr5", {expiresIn: "3h"});
                    res.status(201).json({"token":token});
                }
                else {
                    const erro = {
                        status: 401,
                        msg: "Senha invalida"
                    // Status 401 indica que a solicitação não foi aplicada 
                    //porque não possui credenciais de autenticação válidas para o recurso de destino.
                    }
                    res.status(erro.status).json(erro);
                }
            }
        })
    }
    else {
        const erro = {
            status: 400,
            msg: "Usuario ou senha inexistentes."
        //Status 400 indica que o servidor não pode ou não processará a solicitação devido a algo que é percebido 
        //como um erro do cliente (por exemplo, sintaxe de solicitação malformada, enquadramento de mensagem de solicitação inválido 
        }
        res.status(erro.status).json(erro);
    }
}

exports.validarToken = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(!token){
        const error = { 
            status: 403,
            msg: "Não tem token de acesso."
        //Status 403 significa que você não tem permissão para acessar determinada página.
        }
        res.status(error.status).json(error);
    }
    else {
        jwt.verify(token, "Sen@cr5", (err, payload) => {
            if(err){
                const error = { 
                    status: 403,
                    msg: "Token invalido"
                //Status 403 significa que você não tem permissão para acessar determinada página.
                }
                res.status(error.status).json(error);        
            }
            else{
                console.log("Id do Funcionario: "+payload.id);
                next();
            }
        })
    }
}