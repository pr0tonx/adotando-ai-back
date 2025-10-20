const {Sequelize, DataTypes, Model} = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

class Image extends Model {
  static async createImage(values, options) {
    return await super.create({
      uuid: values.uuid,
      dogUuid: values.dogUuid,
      data: values.data
    }, {transaction: options.transaction});
  };

  static async getImageById(uuid) {
    const image = await super.findByPk(uuid);

    if (!image) return;

    return image;
  };
}

Image.init({
  uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
  },
  dogUuid: {
    type: DataTypes.UUID,
    allowNull: false
  },
  data: {
    type: DataTypes.BLOB('long'),
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
  modelName: 'image',
  freezeTableName: true
});

module.exports = Image;