const {Sequelize, DataTypes, Model} = require('sequelize');
const process = require('process');
const bcrypt = require('bcrypt');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

class Company extends Model {
  password;
}

Company.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

Company.init({
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  addressUuid: {
    type: DataTypes.UUID,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
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
  modelName: 'company',
  paranoid: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

module.exports = Company;
