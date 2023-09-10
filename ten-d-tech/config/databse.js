//var mysql = require('mysql');
const mysql = require('mysql2/promise')
 
  const dbConnPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Vishvanath1997",
    database:"newschema"
  });

  module.exports = dbConnPool;
