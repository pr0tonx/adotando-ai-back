'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn('dog', 'status', {
        type: Sequelize.ENUM('available', 'unavailable', 'pending', 'adopted'),
        allowNull: false,
        defaultValue: Sequelize.literal(
          "'available'"
        )
      }, {transaction: t});
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('dog', 'status', {transaction: t});
    });
  }
};