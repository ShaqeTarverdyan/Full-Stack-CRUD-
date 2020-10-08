const express = require('express');
const db = require('./database');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


//register admin
app.post("/register", (req,res) => {
    const { username, password} = req.body;
    db
    .execute(
        "INSERT INTO admins (username, password) VALUES (?,?)",
        [username, password],
    )
    .then(result => {
        //console.log('res', result)
    })
    .catch((err) => {
        console.log('err', err)
    })
});

//login admin
app.post("/login", (req,res) => {
    const { username, password} = req.body;
    db
    .execute(
        "SELECT * FROM  admins WHERE username = ? AND password = ?",
        [username, password],  
    )
    .then(result => {
        if(result[0][0] === undefined) {
            res.send({error: 'There is no admin with thath data'})
        } else {
            res.send(result[0][0])
        }
    })
    .catch(err => {
        console.log('error', err)
    })
});


//get admins from database
app.get('/admins', (req, res) => {
    db
    .execute("SELECT * FROM admins")
    .then(result => {
        res.send(result[0])
    })
    .catch(error => {
        console.log('err', error);
    })

});

//find current admin //not tested yet
app.post("/admins/:id", (req,res) => {
    const { id } = req.body;
    db
    .execute("SELECT * FROM admins WHERE admin.id = ?", [id])
    .then(res => {
        //console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
})

//delete admin
app.post("/admin/:id", (req,res) => {
    const { id } = req.body;
    console.log('iddd', id)
    db
    .execute("DELETE FROM admins WHERE id = ?", [id])
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
})


app.listen(3001, () => {
    console.log('runnung system...');
    
});