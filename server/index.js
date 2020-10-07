const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: '127.0.0.1',
    password: 'admin',
    database: 'hackTech_intern'
});

app.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "INSERT INTO admins (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
            console.log(result);
        }
    )
});

app.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "SELECT * FROM  admins WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if(err) res.send({error: err});
            if(result.length > 0) {
                res.send(result);
            } else {
                res.send({message: 'Wrong combination'})
            }
        }
    )
})


app.listen(3001, () => {
    console.log('runnung system...');
    
});