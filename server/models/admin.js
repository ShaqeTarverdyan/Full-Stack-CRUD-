const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Admin = sequelize.define('admins', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    firstname: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
    hashedPassword: {
        type: Sequelize.STRING(64),
    },
    role: {
        type: Sequelize.STRING(64),
        allowNull: false
    }
});


module.exports = Admin