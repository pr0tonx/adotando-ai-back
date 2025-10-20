const {Sequelize, DataTypes, Model} = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

class Adoption extends Model {
  static async createAdoption(values, options) {
    return await super.create({
      uuid: values.uuid,
      userUuid: values.userUuid,
      dogUuid: values.dogUuid,
      status: values.status,
    }, {transaction: options.transaction});
  };

  static async getAllAdoptions(limit, page) {
    const {count, rows} = await super.findAndCountAll({
      attributes: {
        include: ['uuid', 'userUuid', 'dogUuid', 'status'],
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      },
      limit,
      offset: (page - 1) * limit,
      paranoid: false,
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

  static async findAdoptionById(uuid) {
    const adoption = await super.findByPk(uuid);

    if (!adoption) return;

    return adoption;
  }

  static async returnAdoption(adoption, options) {
    return await adoption.update({
      status: 'returned'
    }, {transaction: options.transaction});
  };
}

Adoption.init({
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  userUuid: {
    type: DataTypes.UUID,
    allowNull: false
  },
  dogUuid: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'returned'),
    allowNull: false,
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
  modelName: 'adoption',
  freezeTableName: true
});

module.exports = Adoption;
