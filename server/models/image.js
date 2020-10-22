const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Image = sequelize.define("image",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    path: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
})




module.exports = Image;