const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const funcionarioController = require('./Controller/funcionarioController')
const produtoController = require('./controller/produtoController')
const viewRotas = require("./rotas/viewRotas")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(express.static(path.join('Super_merc_frontend/public')))
app.set('view engine', 'ejs')

const produtoRota = require("./rotas/produtoRotas")
app.use('/super_merc/produtos', produtoRota)
app.use(viewRotas)


/*const authRota = require('./rotas/authRotas')
app.use('/', authRota)
app.use(funcionarioController.validarToken)
const funcionarioRota = require('./rotas/funcionarioRotas')
app.use('/super_merc/funcionarios',funcionarioRota)
const produtoRota = require('./rotas/produtoRotas')
app.use('/super_merc/produtos',produtoRota)*/

app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`)
})