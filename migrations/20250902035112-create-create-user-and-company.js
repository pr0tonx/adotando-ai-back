'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('user', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        name: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        cpf: {
          type: Sequelize.STRING(11),
          allowNull: false
        },
        email: {
          type: Sequelize.STRING(254),
          allowNull: false
        },
        password: {
          type: Sequelize.STRING(60),
          allowNull: false
        },
        birthday: {
          type: Sequelize.DATE,
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
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }
      }, {transaction: t});

      await queryInterface.createTable('company', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        name: {
          type: Sequelize.STRING(15),
          allowNull: false
        },
        cnpj: {
          type: Sequelize.STRING(14),
          allowNull: false
        },
        email: {
          type: Sequelize.STRING(254),
          allowNull: false
        },
        password: {
          type: Sequelize.STRING(60),
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
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }
      }, {transaction: t});

      await queryInterface.createTable('address', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        street: {
          type: Sequelize.STRING(254),
          allowNull: false
        },
        number: {
          type: Sequelize.STRING(10),
          allowNull: false
        },
        complement: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        city: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        state: {
          type: Sequelize.STRING(2),
          allowNull: false
        },
        zipCode: {
          type: Sequelize.STRING(8),
          allowNull: false
        },
        userUuid: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'user',
            key: 'uuid'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        companyUuid: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'company',
            key: 'uuid'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
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

      await queryInterface.addColumn('user', 'addressUuid', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'address',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }, {transaction: t});

      await queryInterface.addColumn('company', 'addressUuid', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'address',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }, {transaction: t});

      await queryInterface.createTable('phoneNumber', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        areaCode: {
          type: Sequelize.STRING(2),
          allowNull: true
        },
        number: {
          type: Sequelize.STRING(9),
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
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }
      }, {transaction: t});

      await queryInterface.createTable('userPhoneNumber', {
        userUuid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'user',
            key: 'uuid'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        phoneNumberUuid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'phoneNumber',
            key: 'uuid'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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

      await queryInterface.addConstraint('userPhoneNumber', {
        fields: ['userUuid', 'phoneNumberUuid'],
        type: 'primary key',
        name: 'pk_userPhoneNumber'
      }, {transaction: t});

      await queryInterface.createTable('companyPhoneNumber', {
        companyUuid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'company',
            key: 'uuid'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        phoneNumberUuid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'phoneNumber',
            key: 'uuid'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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

      await queryInterface.addConstraint('companyPhoneNumber', {
        fields: ['companyUuid', 'phoneNumberUuid'],
        type: 'primary key',
        name: 'pk_companyPhoneNumber'
      }, {transaction: t});
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeConstraint('companyPhoneNumber', 'pk_companyPhoneNumber', {transaction: t});
      await queryInterface.dropTable('companyPhoneNumber', {transaction: t});
      await queryInterface.removeConstraint('userPhoneNumber', 'pk_userPhoneNumber', {transaction: t});
      await queryInterface.dropTable('userPhoneNumber', {transaction: t});
      await queryInterface.dropTable('phoneNumber', {transaction: t});
      await queryInterface.removeColumn('company', 'addressUuid', {transaction: t});
      await queryInterface.removeColumn('user', 'addressUuid', {transaction: t});
      await queryInterface.dropTable('address', {transaction: t});
      await queryInterface.dropTable('company', {transaction: t});
      await queryInterface.dropTable('user', {transaction: t});
    });
  }
};