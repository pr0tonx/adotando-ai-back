const {DataTypes, Model} = require('sequelize');
const bcrypt = require('bcrypt');

const {sequelize} = require('../database/database');

const Address = require('./address-model');
const PhoneNumber = require('./phoneNumber-model');

class Company extends Model {
  // password;

  static async createCompany(values, options) {
    return await super.create({
      uuid: values.uuid,
      name: values.name,
      cnpj: values.cnpj,
      email: values.email,
      password: values.password,
      addressUuid: values.addressUuid
    }, {transaction: options.transaction});
  };

  static async getAllCompanies(all, limit, page) {
    const {count, rows} = await super.findAndCountAll({
      attributes: {
        include: ['uuid', 'name', 'cnpj', 'email'],
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

  static async getCompanyById(uuid) {
    return await super.findOne({
      where: {uuid},
      attributes: {
        include: ['uuid', 'name', 'cnpj', 'email'],
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
    })
  };

  static async deleteCompany(uuid) {
    const company = await super.findByPk(uuid);

    if (!company) return;

    return await company.destroy();
  };

  static async reactivateCompany(uuid) {
    const company = await super.findByPk(uuid, {paranoid: false});

    if (!company) return;

    return await company.restore();
  }

  static async getCompanyByKey(obj) {
    const company = await super.findOne({
      where: obj,
      attributes: {
        include: ['uuid', 'name', 'cnpj', 'email'],
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

    if (!company) return;

    return company;
  }
}

// Company.prototype.validPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

Company.init({
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  addressUuid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING(14),
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(254),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(60),
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
    beforeSave: async (company) => {
      if (company.dataValues.password) {
        const salt = await bcrypt.genSalt(10);
        company.dataValues.password = await bcrypt.hash(company.dataValues.password, salt);
      }
    }
  },
  freezeTableName: true
});

module.exports = Company;
