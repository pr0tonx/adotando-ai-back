const uuid = require('uuid');

const postModel = require('../models/post-model');
const {sequelizeError} = require('../errors/sequelizeError');

const createPost = async function (body, options) {
  return await postModel.createPost({
    uuid: uuid.v6(),
    ...body
  }, {transaction: options.transaction})
    .catch(err => sequelizeError(err));
};

const getAllPosts = async function () {
  const posts = await postModel.getAllPosts()
    .catch(err => sequelizeError(err));

  return posts.map(post => {
    const postData = post.dataValues;

    if (postData.dog) {
      const dog = postData.dog.dataValues;

      if (dog.images && dog.images.length > 0) {
        dog.images = dog.images.map(img => {
          return {
            uuid: img.uuid,
            dogUuid: img.dogUuid,
            data: `data:image/png;base64,${img.data.toString('base64')}`
          };
        });
      } else {
        dog.images = [];
      }

      postData.dog = dog;
    }

    return postData;
  });
};

const getPostById = async function (uuid) {
  const post = await postModel.getPostById(uuid)
    .catch(err => sequelizeError(err));

  const postData = post.dataValues;

  if (postData.dog) {
    const dog = postData.dog.dataValues;

    if (dog.images && dog.images.length > 0) {
      dog.images = dog.images.map(img => ({
        uuid: img.uuid,
        dogUuid: img.dogUuid,
        data: `data:image/png;base64,${img.data.toString('base64')}`,
      }));
    } else {
      dog.images = [];
    }

    postData.dog = dog;
  }

  return postData;
};

const deletePost = async function (uuid) {
  return await postModel.deletePost(uuid)
    .catch(err => sequelizeError(err));
}

const getPostsByCompany = async function (companyUuid) {
  const posts = await postModel.getPostsByCompany(companyUuid)
    .catch(err => sequelizeError(err));

  return posts.map(post => {
    const postData = post.dataValues;

    if (postData.dog) {
      const dog = postData.dog.dataValues;

      if (dog.images && dog.images.length > 0) {
        dog.images = dog.images.map(img => {
          return {
            uuid: img.uuid,
            dogUuid: img.dogUuid,
            data: `data:image/png;base64,${img.data.toString('base64')}`
          };
        });
      } else {
        dog.images = [];
      }

      postData.dog = dog;
    }

    return postData;
  });
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  getPostsByCompany
};