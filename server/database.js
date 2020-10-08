const mysql = require('mysql2');


const pool = mysql.createPool({
    user: 'root',
    host: '127.0.0.1',
    password: 'admin',
    database: 'hackTech_intern'
});

module.exports = pool.promise();