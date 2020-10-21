'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('types', [
      {
        name: 'Sport',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Music',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Politic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('types', null, {});
  }
};
