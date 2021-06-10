const mysql = require('mysql')

const conexao = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"super_merc"

});

module.exports = conexao