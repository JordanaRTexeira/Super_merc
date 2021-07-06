const conexao = require('../config/conexaoBD')
const jwt = require('jsonwebtoken')
const clienteRepository = require('../repository/clienteRepository')


exports.listar = (req, res) => {
    clienteRepository.listar((erro, usuarios) => {
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

exports.inserir = (req, res) => {
    const usuario = req.body;
    clienteRepository.inserir(usuario, (erro, usuarioSalvo) =>{
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            res.status(201).json(usuarioSalvo)
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
        clienteRepository.buscarPorId(id, (erro, usuario) =>{
            if(erro){
                res.status(erro.status).json(erro)
            } else {
                res.json(usuario)
            }
        })
    }
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const usuario= req.body;
    const sql = "UPDATE usuarios SET nome=?, email=?, senha=? WHERE id_usuario=?";
    conexao.query(sql, [usuario.nome, usuario.email, usuario.senha, id],(erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        }
        else {
            usuario.id = + id; 
            res.json(usuario);
        }
    })
}

exports.deletar = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM usuarios WHERE id_usuario = ?`;
    conexao.query(sql, [id], (erro, rows) => {
        if(erro){
            res.status(500).json({"erro:":"Database Error"})
            console.log(erro)
        } else {
            if(rows.affectedRows)
            res.json({"msg": `Usuario ${id} removido com sucesso`});
        }
    })
}


