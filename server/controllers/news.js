const News = require('../models/news');
const Types = require('../models/types');
const Admin = require('../models/admin');
const Image = require('../models/image');
const { validationResult } = require('express-validator');

exports.getNews = (req,res,next) => {
  const typeId = req.query.type;
  const query = typeId === undefined ? 
    News.findAll() : 
    News.findAll({
      where: {
        typeId: typeId
      }
    });
  query.then(result => {
    res.status(200).json({news: result})
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
      err.message = "Can not filter items with current type"
    }
    next(err);
  })
};

exports.addNews = async (req,res,next) => {
    const { title, content, typeId, admin_id  } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed!.entered data is not correct!')
        error.statusCode = 422;
        throw error;
    }
    if(!req.file) {
      const err = new Error();
      err.statusCode = 422;
      err.message = ('No Image provided');
      throw err;
    }
    
    let image = await Image.create({
      ...req.file
    })

    let admin = await Admin.findOne({
      where: {
        id: admin_id
      }
    });
    
    let news = await News.create({
      title: title,
      content: content,
      typeId: typeId,
      imageId: image.id
    });
    admin
      .addNews(news)
      .then(result => {
        res.status(200).json({
          message: 'successfuly added !',
          news: result,
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    })
};

exports.updateNews = (req,res,next) => {
  const newsId = req.params.newsId;
  const { title, content, newsType, admin_id  } = req.body;
  const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error('Validation Failed!.entered data is not correct!')
      error.statusCode = 422;
      throw error;
      
    }
  News.findOne({
    where: {
      id: newsId
    }
  })
  .then(news => {
    if(!news) {
      const error = new Error('Could not find admin !');
      error.statusCode = 404;
      throw error;
    }
    news.title = title,
    news.content = content,
    news.newsType = newsType,
    news.admin_id = admin_id
    return news.save();
  })
  .then(updatedNews => {
    res.status(200).json({
      message: 'News updated successfuly !',
      news: updatedNews
    })
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
};

exports.deleteNews = (req,res,next) => {
  const newsId = req.params.newsId;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation Failed!.entered data is not correct!')
    error.statusCode = 422;
    throw error;
  }
  News
    .destroy({
      where: {
        id: newsId
      }
    })
    .then(result => {
      res.status(200).json({
          message: 'Successfuly deleted!',
          isDeleted: result
        });
    })
    .catch(err => {
        if(!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    })
};

exports.getCurrentNews = (req,res, next) => {
  const newsId = req.params.newsId;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation Failed!.entered data is not correct!')
    error.statusCode = 422;
    throw error;
  };
  News.findOne({
    where: {
      id: newsId
    }
  })
  .then(news => {
    if(!news) {
      const error = new Error('Could not find current news !');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({news: news})
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
};

exports.getTypes = (req, res, next) => {
  Types
  .findAll()
  .then(types => {
      res.status(200).json({
        message: 'Fetched Types successfuly.',
        types: types
      })
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
};

exports.getCurrentImage = (req, res, next) => {
  const imageId = req.params.id;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation Failed!.entered data is not correct!')
    error.statusCode = 422;
    throw error;
  };
  Image.findOne({
    where: {
      id: imageId
    }
  })
  .then(image => {
    if(!image) {
      const error = new Error();
      error.statusCode = 404;
      error.message = 'Could not find current Image !';
      throw error;
    }
    res.status(200).json({image: image})
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
}