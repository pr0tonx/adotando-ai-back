'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('post', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        description: {
          allowNull: true,
          type: Sequelize.STRING(500)
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }
      }, {transaction: t});

      await queryInterface.addColumn('post', 'companyUuid', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'company',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, {transaction: t});

      await queryInterface.addColumn('post', 'dogUuid', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'dog',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, {transaction: t});
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('post', 'dogUuid', {transaction: t});
      await queryInterface.removeColumn('post', 'companyUuid', {transaction: t});
      await queryInterface.dropTable('post', {transaction: t});
    });
  }
};