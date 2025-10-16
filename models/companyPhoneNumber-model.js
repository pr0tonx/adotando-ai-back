const {Sequelize, DataTypes, Model} = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

class CompanyPhoneNumber extends Model {

  static async createCompanyPhoneNumber(values, options) {
    return await super.create({
      uuid: values.uuid,
      companyUuid: values.companyUuid,
      phoneNumberUuid: values.phoneNumberUuid
    }, {transaction: options.transaction});
  };
};

CompanyPhoneNumber.init({
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  companyUuid: {
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
  modelName: 'companyPhoneNumber',
  freezeTableName: true
});

module.exports = CompanyPhoneNumber;