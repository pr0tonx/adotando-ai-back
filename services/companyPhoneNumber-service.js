const uuid = require('uuid');

const companyPhoneNumberModel = require('../models/companyPhoneNumber-model');
const {sequelizeError} = require('../errors/sequelizeError');

const createCompanyPhoneNumber = async function (body, transaction) {
  const companyPhoneNumber = await companyPhoneNumberModel.createCompanyPhoneNumber({
    uuid: uuid.v6(), ...body
  }, {transaction})
    .catch(err => sequelizeError(err));

  return companyPhoneNumber.dataValues;
};

module.exports = {
  createCompanyPhoneNumber
};