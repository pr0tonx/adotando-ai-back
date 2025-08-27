'use strict';

const {DataTypes} = require('sequelize');

module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Test', {
          uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
          }
        })
      ])
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('TEST', {transaction: t})
      ]);
    });
  }
};
