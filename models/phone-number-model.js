const {Sequelize, DataTypes, Model} = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

class PhoneNumber extends Model {

}

PhoneNumber.init({
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  areaCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
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
  modelName: 'phoneNumber'
});

module.exports = PhoneNumber;
