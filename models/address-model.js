const {Sequelize, DataTypes, Model} = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

class Address extends Model {

}

Address.init({
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  userUuid: {
    type: DataTypes.UUID,
    allowNull: true
  },
  companyUuid: {
    type: DataTypes.UUID,
    allowNull: true
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
  modelName: 'address'
});

module.exports = Address;
