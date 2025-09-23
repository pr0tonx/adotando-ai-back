const uuid = require('uuid');

const {sequelize} = require('../database/database');
const ResponseFactory = require('../utils/ResponseFactory');
const phoneNumberModel = require('../models/phoneNumber-model');

const createPhoneNumber = async function (body, transaction) {
  const request = {uuid: uuid.v6(), ...body}

  const phoneNumber = await phoneNumberModel.create(request, transaction);

  if (!phoneNumber) {
    await transaction.rollback();
    return new ResponseFactory().createError(
      'INTERNAL_SERVER_ERROR',
      'An error occurred while creating the address.',
      {},
      500
    );
  }

  return phoneNumber.dataValues;
}

module.exports = {
  createPhoneNumber
}