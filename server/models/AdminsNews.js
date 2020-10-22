const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const AdminsNews = sequelize.define('AdminsNews', {
    
});
AdminsNews.removeAttribute('id');


module.exports = AdminsNews