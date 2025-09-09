const {Sequelize, DataTypes, Model} = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

class Dog extends Model {

}

Dog.init({
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  companyUuid: {
    allowNull: false,
    type: DataTypes.UUID
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  breed: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  color: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'dog'
});

module.exports = Dog;
