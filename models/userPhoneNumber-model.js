const {Sequelize, DataTypes, Model} = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

class UserPhoneNumber extends Model {

  static async create(values, options) {
    return await super.create({
      uuid: values.uuid,
      userUuid: values.userUuid,
      phoneNumberUuid: values.phoneNumberUuid
    }, {transaction: options.transaction});
  }
}

UserPhoneNumber.init({
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  userUuid: {
    allowNull: false,
    type: DataTypes.UUID
  },
  phoneNumberUuid: {
    allowNull: false,
    type: DataTypes.UUID
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
  modelName: 'userPhoneNumber',
  freezeTableName: true
});

module.exports = UserPhoneNumber;
