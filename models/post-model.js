const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../database/database');

class Post extends Model {
  static async createPost (values, options) {
    return await super.create({
      uuid: values.uuid,
      description: values.description,
      companyUuid: values.companyUuid,
      dogUuid: values.dogUuid
    }, {transaction: options.transaction});
  };
}

Post.init({
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  companyUuid: {
    type: DataTypes.UUID,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  sequelize,
  modelName: 'post',
  freezeTableName: true,
});

module.exports = Post;