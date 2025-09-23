const uuid = require('uuid');

const {sequelize} = require('../database/database');
const ResponseFactory = require('../utils/ResponseFactory');
const userPhoneNumberModel = require('../models/userPhoneNumber-model');

const createUserPhoneNumber = async function (body, transaction) {
  const request = {uuid: uuid.v6(), ...body};

  const userPhoneNumber = await userPhoneNumberModel.create(request, transaction);

  if (!userPhoneNumber) {
    await transaction.rollback();
    return new ResponseFactory().createError(
      'INTERNAL_SERVER_ERROR',
      'An error occurred while creating the address.',
      {},
      500
    );
  }

  return userPhoneNumber.dataValues;
}

module.exports = {
  createUserPhoneNumber
}