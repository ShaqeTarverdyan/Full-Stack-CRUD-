const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const newsController = require('../controllers/news');

router.get('/news-list', newsController.getallNews);
router.post(
        '/news',
        [
            body('title')
                .trim()
                .notEmpty(),
            body('content')
                .trim()
                .notEmpty()
        ],
        newsController.addNews);
router.put('/news/:newsId', newsController.updateNews);
router.delete('/news/:newsId', newsController.deleteNews);


module.exports = router;


