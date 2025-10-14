const {Sequelize, DataTypes, Model} = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

class PhoneNumber extends Model {
  static async createPhoneNumber(values, options) {
    return await super.create({
      uuid: values.uuid,
      areaCode: values.areaCode,
      phoneNumber: values.phoneNumber
    }, {transaction: options.transaction});
  };

  static async updatePhoneNumber(values, options) {
    return await super.update(
      values.changes,
      {
        where: {uuid: values.uuid},
        transaction: options.transaction
      }
    );
  };
}

PhoneNumber.init({
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  areaCode: {
    type: DataTypes.STRING(2),
    allowNull: true
  },
  phoneNumber: {
    type: DataTypes.STRING(9),
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
  modelName: 'phoneNumber',
  freezeTableName: true
});

module.exports = PhoneNumber;
