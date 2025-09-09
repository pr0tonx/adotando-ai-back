'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('adoption', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }
      }, {transaction: t});

      await queryInterface.addColumn('adoption', 'userUuid', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, {transaction: t});

      await queryInterface.addColumn('adoption', 'dogUuid', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'dog',
          key: 'uuid'
        },
      }, {transaction: t});
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('adoption', 'dogUuid', {transaction: t});
      await queryInterface.removeColumn('adoption', 'userUuid', {transaction: t});
      await queryInterface.dropTable('adoption', {transaction: t});
    });
  }
};