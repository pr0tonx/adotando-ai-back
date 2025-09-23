'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn('address', 'neighborhood', {
        type: Sequelize.STRING(100),
        allowNull: false
      }, {transaction: t});
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('address', 'neighborhood', {transaction: t});
    });
  }
};
