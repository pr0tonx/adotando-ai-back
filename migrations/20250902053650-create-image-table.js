'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('image', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        dogUuid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'dog',
            key: 'uuid'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        data: {
          type: Sequelize.BLOB('long'),
          allowNull: false
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
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('image', {transaction: t});
    });
  }
};