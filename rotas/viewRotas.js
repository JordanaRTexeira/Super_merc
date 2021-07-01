const express = require('express');
const viewRotas = express.Router();


viewRotas.get('/cortesia', function(req, res){
  res.render("../Super_merc_frontend/public/views/inicio")
})

viewRotas.get('/historia', function(req, res){
  res.render("../Super_merc_frontend/public/views/historia")
})

viewRotas.get('/produtos', function(req, res){
  res.render("../Super_merc_frontend/public/views/produtos")
})

viewRotas.get('/contato', function(req, res){
  res.render("../Super_merc_frontend/public/views/contato")
})

viewRotas.get('/clientes', function(req, res){
  res.render("../Super_merc_frontend/public/views/clientes")
})


viewRotas.get('/login', function(req, res){
  res.render("../Super_merc_frontend/public/views/login")
})


viewRotas.get('/adm', function(req, res) { 
  res.render("../Super_merc_frontend/public/views/adm")  
})

module.exports = viewRotas