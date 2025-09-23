const uuid = require('uuid');

const addressModel = require('../models/address-model');
const {sequelize} = require('../database/database');
const ResponseFactory = require('../utils/ResponseFactory');

const createAddress = async function (body, transaction) {
  const request = {uuid: uuid.v6(), ...body};

  const address = await addressModel.create(request, transaction);

  if (!address) {
    await transaction.rollback();
    return new ResponseFactory().createError(
      'INTERNAL_SERVER_ERROR',
      'An error occurred while creating the address.',
      {},
      500
    );
  }

  return address.dataValues;
}

module.exports = {
  createAddress
}