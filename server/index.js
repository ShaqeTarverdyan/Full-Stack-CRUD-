const express = require('express');
const bodyParser =require('body-parser');
const sequelize = require('./util/database');
const cors = require("cors");



const Admin = require('./models/admin');
const News = require('./models/news');


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// app.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     Response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Autherization');
//     next();
// })

const adminRoutes = require('./routes/admin');

app.use(adminRoutes);


sequelize
    .sync({force: false})
    .then(result => {
        app.listen(3001)
    }).catch(err => console.log(err))




// //get admins from database
// app.get('/admins', (req, res) => {
//     db
//     .execute("SELECT * FROM admins")
//     .then(result => {
//         res.send(result[0])
//     })
//     .catch(error => {
//         console.log('err', error);
//     })

// });

// //find current admin //not tested yet
// app.post("/admins/:id", (req,res) => {
//     const { id } = req.body;
//     db
//     .execute("SELECT * FROM admins WHERE admin.id = ?", [id])
//     .then(res => {
//         //console.log(res)
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

// //delete admin
// app.post("/admin/:id", (req,res) => {
//     const { id } = req.body;
//     db
//     .execute("DELETE FROM admins WHERE id = ?", [id])
//     .then(res => {
//         console.log(res)
//     })
//     .c  console.log(state)


