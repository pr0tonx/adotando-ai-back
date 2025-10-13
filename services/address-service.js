const uuid = require('uuid');

const addressModel = require('../models/address-model');
const {sequelizeError} = require('../errors/sequelizeError');

const createAddress = async function (body, transaction) {
  const address = await addressModel.create({uuid: uuid.v6(), ...body}, {transaction})
    .catch(err => sequelizeError(err));

  return address.dataValues;
}

module.exports = {
  createAddress
}