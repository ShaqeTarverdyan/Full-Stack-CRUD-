const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const newsController = require('../controllers/news');
const isAuth = require('../middleware/is-auth');
var multer  = require('multer')
const path = require('path');
const uuid = require('uuid')


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname))
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

const upload = multer({ storage: fileStorage, fileFilter: fileFilter});

router.post(
        '/news',
        upload.single('image'),
        isAuth,
        [
            body('title')
                .trim()
                .notEmpty(),
            body('content')
                .trim()
                .notEmpty()
        ],
        newsController.addNews);
router.put('/news/:newsId', isAuth, newsController.updateNews);
router.delete('/news/:newsId',isAuth, newsController.deleteNews);
router.get('/news-/:newsId', isAuth, newsController.getCurrentNews);
router.get("/types",isAuth, newsController.getTypes);
router.get('/image/:id', newsController.getCurrentImage);

router.get('/news?', isAuth, newsController.getNewsList);
router.get('/myNews?', isAuth, newsController.getMyNewsList);
router.post('/attachAdminToNews', newsController.attachAdminToNews);
router.get('/notAttachedAdmins', newsController.getNotAttachedAdmins);

module.exports = router;


