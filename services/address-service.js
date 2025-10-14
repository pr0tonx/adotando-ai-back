const uuid = require('uuid');

const addressModel = require('../models/address-model');
const {sequelizeError} = require('../errors/sequelizeError');
const {getChangedFields} = require('../utils/getChangedFields');

const createAddress = async function (body, transaction) {
  const address = await addressModel.createAddress({uuid: uuid.v6(), ...body}, {transaction})
    .catch(err => sequelizeError(err));

  return address.dataValues;
}

const updateAddress = async function (body, transaction) {

  const changes = getChangedFields(body.currentAddress, body.newAddress,
    ['street', 'number', 'complement', 'city', 'state', 'zipCode', 'neighborhood']);

  if (Object.keys(changes).length === 0) return changes;

  await addressModel.updateAddress({uuid: body.uuid, changes}, {transaction})
    .catch(err => sequelizeError(err));

  return changes;
}

module.exports = {
  createAddress,
  updateAddress
}