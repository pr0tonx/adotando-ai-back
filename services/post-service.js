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

module.exports = {
  createPost
};