'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER
      },
      make: {
        allowNull: false,
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      trim: {
        type: Sequelize.STRING
      },
      bodyStyle: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      vin: {
        type: Sequelize.STRING
      },
      miles: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Vehicles');
  }
};
