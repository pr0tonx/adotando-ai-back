const {Sequelize, DataTypes, Model} = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

class Dog extends Model {
  static async createDog(values, options) {
    return await super.create({
      uuid: values.uuid,
      name: values.name,
      gender: values.gender,
      age: values.age,
      breed: values.breed,
      color: values.color,
      description: values.description,
      status: values.status,
      companyUuid: values.companyUuid
    }, {transaction: options.transaction});
  };

  static async getAllDogs(status, limit, page) {
    const {count, rows} = await super.findAndCountAll({
      attributes: {
        include: ['uuid', 'name', 'gender', 'age', 'breed', 'color', 'description', 'status'],
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      },
      where: {status},
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

  static async getDogById(uuid) {
    return await super.findOne({
      where: {uuid},
      attributes: {
        include: ['uuid', 'name', 'gender', 'age', 'breed', 'color', 'description', 'status'],
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      }
    });
  };

  static async editDog(values, options) {
    return await super.update(
      {
        'status': values['status'],
        ...values.changes,
      },
      {
        where: {uuid: values.uuid},
        transaction: options.transaction
      }
    );
  };

  static async deleteDog(uuid) {
    const dog = await super.findByPk(uuid);

    if (!dog) return;

    return await dog.destroy();
  };

  static async reactivateDog(uuid) {
    const dog = await super.findByPk(uuid, {paranoid: false});

    if (!dog) return;

    return await dog.restore();
  };
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
  status: {
    type: DataTypes.ENUM('available', 'unavailable', 'pending', 'adopted'),
    allowNull: false,
    defaultValue: 'available'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'dog',
  paranoid: true,
  freezeTableName: true
});

module.exports = Dog;
