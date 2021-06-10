const express = require('express')
const funcionarioController = require('./Controller/funcionarioController')
const usuarioController = require('./Controller/usuarioController')
const produtoController = require('./controller/produtoController')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

const authRota = require('./rotas/authRotas')
app.use('/super_merc/auth', authRota)
app.use(funcionarioController.validarToken)
const funcionarioRota = require('./rotas/funcionarioRotas')
app.use('/super_merc/funcionarios',funcionarioRota)
const produtoRota = require('./rotas/produtoRotas')
app.use('/super_merc/produtos',produtoRota)

const authRotaUsuario = require('./rotas/authRotasUsuario')
app.use('/super_merc/authUsuario', authRotaUsuario)
app.use(usuarioController.validarToken)
const usuarioRota = require('./rotas/usuarioRotas')
app.use('/super_merc/usuarios', usuarioRota)
const carrinhoRota = require('./rotas/carrinhoRotas')
app.use('/super_merc/carrinhos', carrinhoRota)





app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`)
})