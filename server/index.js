const express = require('express');
const bodyParser =require('body-parser');
const sequelize = require('./util/database');
const cors = require("cors");



const Admin = require('./models/admin');
const News = require('./models/news');
const Types = require('./models/types');
const Files = require('./models/files');

News.belongsTo(Types, { constraints: true, onDelete: 'CASCADE' });
Types.hasMany(News);

News.belongsTo(Files, { constraints: true, onDelete: 'CASCADE' });
Files.hasMany(News);

Admin.belongsToMany(News, { through: 'AdminsNews'});
News.belongsToMany(Admin, { through: 'AdminsNews'});


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const adminRoutes = require('./routes/admin');
const newsRouter = require('./routes/news');

app.use(adminRoutes);
app.use(newsRouter);

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


