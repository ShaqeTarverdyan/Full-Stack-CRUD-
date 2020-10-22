const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const newsController = require('../controllers/news');
const isAuth = require('../middleware/is-auth');

router.get('/news?',isAuth, newsController.getNews);
router.post(
        '/news',
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


module.exports = router;


