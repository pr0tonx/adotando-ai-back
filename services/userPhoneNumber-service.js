const uuid = require('uuid');

const userPhoneNumberModel = require('../models/userPhoneNumber-model');
const {sequelizeError} = require('../errors/sequelizeError');

const createUserPhoneNumber = async function (body, transaction) {
  const userPhoneNumber = await userPhoneNumberModel.create({uuid: uuid.v6(), ...body}, {transaction})
    .catch(err => sequelizeError(err));

  return userPhoneNumber.dataValues;
}

module.exports = {
  createUserPhoneNumber
}