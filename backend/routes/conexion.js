var mysql = require('mysql');
var express = require('express');


var conexion = mysql.createConnection({
    user: 'root',
    password: 'drasan',
    host: 'localhost',
    database: 'BaseStock',
    port: 3306
});

//var ip = 'localhost';

module.exports = conexion;

// ignorado .....