const express = require('express');
const bodyParser =require('body-parser');
const sequelize = require('./util/database');
const cors = require("cors");
const News = require('./models/news');
const Image = require('./models/image')
const app = express();
const multer = require('multer');
const dotenv = require('dotenv');
var path = require('path');
dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/public',express.static('public'));

News.belongsTo(Image);
Image.hasMany(News, { 
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})


const adminRoutes = require('./routes/admin');
const newsRouter = require('./routes/news');

app.use(adminRoutes);
app.use(newsRouter);
app.use(bodyParser.json());
app.use(
    multer().single('image')
);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
});

sequelize
    .sync({force: false})
    .then(result => {
        app.listen(3001)
    }).catch(err => console.log(err))


    