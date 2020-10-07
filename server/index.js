const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: '127.0.0.1',
    password: 'admin',
    database: 'login_test'
});

app.listen(3001, () => {
    console.log('runnung system...');
});