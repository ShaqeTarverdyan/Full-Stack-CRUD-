const News = require('../models/news');
const Types = require('../models/types');
const Admin = require('../models/admin');
const File = require('../models/file');
const { validationResult } = require('express-validator');

exports.getAttachedAdmins = (req, res) => {
  const newsId = req.query.newsId;
  News.findAll({
    where:  {id: newsId},
    include: {
      model: Admin
    }
  }).then(result => {
    res.status(200).json({result})
  })
  .catch(error => {
    console.log(error);
  })
};

exports.attachAdminToNews = (req, res) => {
  const { newsId, email } = req.body;
  Admin
    .findOne({
      where: {email: email}
    })
    .then(item=>{
      item.addNews(newsId);
      res.status(200).json({message: `Successfully attached admin with email:${email} to news with id:${newsId}`});
    })
    .catch(error => {
      res.status(500).send({
        message: "Error on attach news to Admin",
        error: error.message,
      });
    })
};

exports.getMyNewsList = (req, res) => {
  const id = req.adminId;
  Admin.findOne({
    where: {id: id}, 
    include: {
      model: News
  }
  }).then(result => {
    res.status(200).json({result});
  })
  .catch(error => {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  });
};

exports.getNewsList = async(req, res) => {
  try {
    let page =req.query.page || 1;
    let limit = req.query.limit || 2;
    let typeId=req.query.typeId;

    const offset = (page-1) * limit;
    let conditions = {};
    
    if(typeId !== undefined) {
      conditions.typeId = typeId
    }
    let options = {
      where: conditions,
      attributes: ['id', 'title', 'content', 'typeId'],
      order: [
        ['createdAt', 'DESC']
      ],
      limit: limit,
      offset: offset
    };
    News
    .findAndCountAll({...options})
    .then(data => {
      const totalPages = Math.ceil(data.count / limit);
      const response = {
        message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", typeId = " + typeId,
          totalItems: data.count,
          totalPages: totalPages,
          limit: limit,
          currentPageNumber: parseInt(page),
          currentPageSize: data.rows.length,
          news: data.rows
      }
      res.status(200).json({response: response})
    })
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }
};

exports.addNews = async (req,res,next) => {
  try {
    const admin_id = req.adminId;
    const { title, content, typeId  } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed!.entered data is not correct!')
        error.statusCode = 422;
        throw error;
    }
    console.log('req.files', req.files)
    if(!req.files) {
      const err = new Error();
      err.statusCode = 422;
      err.message = ('No Files provided');
      throw err;
    }
    let admin = await Admin.findOne({
      where: {
        id: admin_id
      }
    });
    
    let news = await News.create({
      title: title,
      content: content,
      typeId: typeId,
    });

    for(let i = 0; i < req.files.length; i++) {
      let file = await File.create(req.files[i]);
      news.addFile(file);
    };

    let result = await admin.addNews(news);
    res.status(200).json({
          message: 'successfuly added !',
          news: result,
    })
  }catch (err)  {
        if(!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateNews = (req,res,next) => {
  const admin_id = req.adminId;
  const newsId = req.params.newsId;
  const { title, content, newsType } = req.body;
  const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error('Validation Failed!.entered data is not correct!')
      error.statusCode = 422;
      throw error;
      
    }
  News.findOne({
    where: {
      id: newsId
    },
    include: {
      model: File
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
    },
    include: File
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