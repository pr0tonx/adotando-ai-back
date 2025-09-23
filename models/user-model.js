const {Sequelize, DataTypes, Model} = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const bcrypt = require('bcrypt');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

class User extends Model {
  // password;

  static async create(values, options) {
    return await super.create({
      uuid: values.uuid,
      name: values.name,
      cpf: values.cpf,
      email: values.email,
      password: values.password,
      birthday: values.birthday,
      addressUuid: values.addressUuid
    }, {transaction: options.transaction});
  };

  static async getAllUsers(all) {
    return await super.findAll({
      paranoid: all,
    });
  };

  static async getUserById(uuid) {
    return await super.findByPk(uuid);
  };

  static async getUserByEmail(email) {
    return await super.findOne({where: {email}});
  };

  static async getUserByCpf(cpf) {
    return await super.findOne({where: {cpf}});
  }

  // TODO
  static async updateUser(uuid, body) {
    // fazer o find one, salvar em 'user'
    // user.save();
  };

  static async deleteUser(uuid) {
    const user = await super.findByPk(uuid);

    if (!user) return;

    return await user.destroy();
  };

  static async reactivateUser(uuid) {
    const user = await super.findByPk(uuid, {paranoid: false});

    if (!user) return;

    return await user.restore();
  };
}

// User.prototype.validPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

User.init({
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
    type: DataTypes.STRING(150),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(11),
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(254),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE,
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
  modelName: 'user',
  paranoid: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.dataValues.password) {
        const salt = await bcrypt.genSalt(10);
        user.dataValues.password = await bcrypt.hash(user.dataValues.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.dataValues.password = await bcrypt.hash(user.dataValues.password, salt);
      }
    }
  },
  freezeTableName: true
});

module.exports = User;