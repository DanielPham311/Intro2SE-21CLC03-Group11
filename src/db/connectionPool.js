const mysql = require('mysql');
const dbConfig = require('./dbConfiguration');

const connectionPool = mysql.createPool(dbConfig);

module.exports = {connectionPool};