const uuid = require('uuid');

const phoneNumberModel = require('../models/phoneNumber-model');
const {sequelizeError} = require('../errors/sequelizeError');

const createPhoneNumber = async function (body, transaction) {
  const phoneNumber = await phoneNumberModel.create({uuid: uuid.v6(), ...body}, {transaction})
    .catch(err => sequelizeError(err));

  return phoneNumber.dataValues;
}

module.exports = {
  createPhoneNumber
}