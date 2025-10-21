'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('dog', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        gender: {
          type: Sequelize.ENUM('M', 'F'),
          allowNull: false
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        breed: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        color: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        description: {
          type: Sequelize.STRING(500),
          allowNull: true
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

      await queryInterface.addColumn('dog', 'companyUuid', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'company',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, {transaction: t});
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('dog', 'companyUuid', {transaction: t});
      await queryInterface.dropTable('dog', {transaction: t});
    });
  }
};