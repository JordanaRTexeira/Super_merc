const express = require('express');
const admRotas = express.Router();

admRotas.get('/', function(req, res) { 
    res.render("../Super_merc_frontend/public/views/adm")  
})

admRotas.get('/produtosEstoque', function(req, res) { 
    res.render("../Super_merc_frontend/public/views/produtosEstoque")  
})

admRotas.get('/funcionarios', function(req, res) {
    res.render("../Super_merc_frontend/public/views/funcionarios")
})


module.exports = admRotas