module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn('adoption', 'status', {
        type: Sequelize.ENUM('active', 'returned'),
        allowNull: false,
        defaultValue: Sequelize.literal(
          "'active'"
        )
      }, {transaction: t});
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('adoption', 'status', {transaction: t});
    });
  }
};