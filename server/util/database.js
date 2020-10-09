const Sequelize = require('sequelize');

const sequelize = new Sequelize('hackTech_intern', 'root', 'admin', {
    dialect: 'mysql', 
    host: '127.0.0.1'
});

module.exports = sequelize;