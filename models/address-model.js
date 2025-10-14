const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../database/database');

class Address extends Model {
  static async createAddress(values, options) {
    return await super.create({
      uuid: values.uuid,
      street: values.street,
      number: values['number'],
      complement: values.complement,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      neighborhood: values.neighborhood
    }, {transaction: options.transaction});
  };

  static async updateAddress(values, options) {
    return await super.update(
      values.changes,
      {
        where: {uuid: values.uuid},
        transaction: options.transaction
      }
    );
  };
}

Address.init({
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  street: {
    type: DataTypes.STRING(254),
    allowNull: false
  },
  number: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  complement: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  zipCode: {
    type: DataTypes.STRING(8),
    allowNull: false
  },
  neighborhood: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'address',
  freezeTableName: true
});

module.exports = Address;
