const express = require('express');
const bodyParser =require('body-parser');
const sequelize = require('./util/database');
const cors = require("cors");
const News = require('./models/news');
const Image = require('./models/image')
const app = express();
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors());

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '_' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

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
    multer({fileStorage: fileStorage, fileFilter: fileFilter}).single('image')
);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
});
        console.log(process.env.DB_SCHEMA);

sequelize
    .sync({force: false})
    .then(result => {
        app.listen(3001)
    }).catch(err => console.log(err))


    