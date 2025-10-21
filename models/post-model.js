const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../database/database');
const Dog = require("./dog-model");
const Company = require("./company-model");
const Image = require("./image-model");
const Address = require("./address-model");
const PhoneNumber = require("./phoneNumber-model");
const {getPostsByCompany} = require("../controllers/company-controller");

class Post extends Model {
  static async createPost (values, options) {
    return await super.create({
      uuid: values.uuid,
      description: values.description,
      companyUuid: values.companyUuid,
      dogUuid: values.dogUuid
    }, {transaction: options.transaction});
  };

  static async getAllPosts() {
    return await super.findAll({
      attributes: {
        include: ['uuid', 'description', 'companyUuid', 'dogUuid'],
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      },
      include: [
        {
          model: Dog,
          as: 'dog',
          attributes: {
            include: ['uuid', 'name', 'gender', 'age', 'breed', 'color', 'description', 'status'],
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
          },
          include: [
            {
              model: Image,
              as: 'images',
              attributes: {
                include: ['uuid', 'dogUuid', 'data'],
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
              }
            }
          ]
        },
        {
          model: Company,
          as: 'company',
          attributes: {
            include: ['uuid', 'name', 'cnpj', 'email', 'addressUuid'],
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
          ]
        }
      ]
    });
  }

  static async getPostById(uuid) {
    return await super.findOne({
      attributes: {
        include: ['uuid', 'description', 'companyUuid', 'dogUuid'],
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      },
      include: [
        {
          model: Dog,
          as: 'dog',
          attributes: {
            include: ['uuid', 'name', 'gender', 'age', 'breed', 'color', 'description', 'status'],
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
          },
          include: [
            {
              model: Image,
              as: 'images',
              attributes: {
                include: ['uuid', 'dogUuid', 'data'],
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
              }
            }
          ]
        },
        {
          model: Company,
          as: 'company',
          attributes: {
            include: ['uuid', 'name', 'cnpj', 'email', 'addressUuid'],
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
          ]
        }
      ]
    }, {where: {uuid}});
  };

  static async deletePost(uuid) {
    const post = await super.findByPk(uuid);

    if (!post) return;

    return await post.destroy();
  };

  static async getPostsByCompany(uuid) {
    const posts = await super.findAll({
      attributes: {
        include: ['uuid', 'description', 'companyUuid', 'dogUuid'],
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      },
      include: [
        {
          model: Dog,
          as: 'dog',
          attributes: {
            include: ['uuid', 'name', 'gender', 'age', 'breed', 'color', 'description', 'status'],
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
          },
          include: [
            {
              model: Image,
              as: 'images',
              attributes: {
                include: ['uuid', 'dogUuid', 'data'],
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
              }
            }
          ]
        },
        {
          model: Company,
          as: 'company',
          attributes: {
            include: ['uuid', 'name', 'cnpj', 'email', 'addressUuid'],
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
          ]
        }
      ]
    }, {where: {companyUuid: uuid}});

    if (!posts) return;

    return posts;
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
  dogUuid: {
    type: DataTypes.UUID,
    allowNull: false,
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