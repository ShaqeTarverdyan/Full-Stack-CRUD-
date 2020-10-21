'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admins', [{
      firstname: 'Shaqe',
      lastname: 'Tarverdyan',
      email: 'tshaqe@gmail.com',
      password: '123456',
      role: 'super',
      isActive: true,
      isConfirmed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admins', null, {});
  }
  
};
