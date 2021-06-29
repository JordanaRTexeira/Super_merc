const express = require('express')
const funcionarioController = require('./Controller/funcionarioController')
const usuarioController = require('./Controller/usuarioController')
const produtoController = require('./controller/produtoController')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use(express.static(__dirname + "/public"))
app.set('view engine', 'ejs')

app.get('/super_merc', function(req, res){
  res.render("../views/inicio")
})

app.get('/historia', function(req, res){
  res.render("../views/historia")
})

app.get('/produtos', function(req, res){
  res.render("../views/produtos")
})

app.get('/contato', function(req, res){
  res.render("../views/contato")
})

app.get('/clientes', function(req, res){
  res.render("../views/clientes")
})


app.get('/login', function(req, res){
  res.render("../views/login")
})

const authRota = require('./rotas/authRotas')
app.use('/', authRota)
app.use(funcionarioController.validarToken)
const funcionarioRota = require('./rotas/funcionarioRotas')
app.use('/super_merc/funcionarios',funcionarioRota)
const produtoRota = require('./rotas/produtoRotas')
app.use('/super_merc/produtos',produtoRota)


app.get('/adm', usuarioController.validarToken, (req, res, next) => { 
  res.render("../views/adm")  
})


/* const authRotaUsuario = require('./rotas/authRotasUsuario')
app.use('/authUsuario', authRotaUsuario)
app.use(usuarioController.validarToken)
const usuarioRota = require('./rotas/usuarioRotas')
app.use('/super_merc/usuarios', usuarioRota)
const carrinhoRota = require('./rotas/carrinhoRotas')
app.use('/super_merc/carrinhos', carrinhoRota) */ 




app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`)
})