const path = require('path')
const express = require('express')
const cors = require('cors')
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv').config()
const port = 3000

const produtoRota = require("./rotas/produtoRotas")
const funcionarioRota = require('./rotas/funcionarioRotas')
const clienteRota = require('./rotas/clienteRotas')
const viewRotas = require("./rotas/viewRotas")
const loginRouter = require('./rotas/login');
const admRotas = require("./rotas/admRotas")

function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login?fail=true');
}

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(express.static(path.join('Super_merc_frontend/public')))
app.set('view engine', 'ejs')

app.use('/super_merc/produtos', produtoRota)
app.use('/super_merc/funcionarios', funcionarioRota)
app.use('/super_merc/clientes', clienteRota)
app.use(viewRotas)
app.use('/login', loginRouter);
app.use('/adm', authenticationMiddleware ,admRotas)

const MySQLStore = require('express-mysql-session')(session);
require('./auth')(passport);
app.use(session({
  store: new MySQLStore({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }//30min
}))
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`)
})