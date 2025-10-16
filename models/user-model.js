const {DataTypes, Model} = require('sequelize');
const bcrypt = require('bcrypt');

const {sequelize} = require('../database/database');

const Address = require('./address-model');
const PhoneNumber = require('./phoneNumber-model');

class User extends Model {
  // password;

  static async createUser(values, options) {
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

  static async getAllUsers(all, limit, page) {
    const {count, rows} = await super.findAndCountAll({
      attributes: {
        include: ['uuid', 'name', 'cpf', 'email', 'birthday'],
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
      },
      include: [
        {
          model: Address,
          as: 'address',
          attributes: {
            include: ['uuid', 'street', 'number', 'complement', 'city', 'state', 'zipCode', 'neighborhood'],
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
          }
        },
        {
          model: PhoneNumber,
          as: 'phoneNumber',
          attributes: {
            include: ['uuid', 'areaCode', 'phoneNumber'],
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
          },
          through: {attributes: []}
        }
      ],
      limit,
      offset: (page - 1) * limit,
      paranoid: all,
    });

    const totalPages = Math.max(1, Math.ceil(count / limit));

    return {
      data: rows,
      meta: {
        totalResults: count,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  };

  static async getUserById(uuid) {
    return await super.findOne({
      where: {uuid},
      attributes: {
        include: ['uuid', 'name', 'cpf', 'email', 'birthday'],
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
      },
      include: [
        {
          model: Address,
          as: 'address',
          attributes: {
            include: ['uuid', 'street', 'number', 'complement', 'city', 'state', 'zipCode', 'neighborhood'],
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
          },
        },
        {
          model: PhoneNumber,
          as: 'phoneNumber',
          attributes: {
            include: ['uuid', 'areaCode', 'phoneNumber'],
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
          },
          through: {attributes: []}
        }
      ]
    });
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

  static async getUserByKey(obj) {
    const user = await super.findOne({
      where: obj,
      attributes: {
        include: ['uuid', 'name', 'cpf', 'email', 'birthday'],
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt']
      },
      include: [
        {
          model: Address,
          as: 'address',
          attributes: {
            include: ['uuid', 'street', 'number', 'complement', 'city', 'state', 'zipCode', 'neighborhood'],
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
          },
        },
        {
          model: PhoneNumber,
          as: 'phoneNumber',
          attributes: {
            include: ['uuid', 'areaCode', 'phoneNumber'],
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
          },
          through: {attributes: []}
        }
      ]
    });

    if (!user) return;

    return user;
  }
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
    beforeSave: async (user) => {
      if (user.dataValues.password) {
        const salt = await bcrypt.genSalt(10);
        user.dataValues.password = await bcrypt.hash(user.dataValues.password, salt);
      }
    }
  },
  freezeTableName: true
});

module.exports = User;