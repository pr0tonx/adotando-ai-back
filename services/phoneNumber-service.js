const uuid = require('uuid');

const phoneNumberModel = require('../models/phoneNumber-model');
const {sequelizeError} = require('../errors/sequelizeError');
const {getChangedFields} = require('../utils/getChangedFields');

const createPhoneNumber = async function (body, transaction) {
  const phoneNumber = await phoneNumberModel.createPhoneNumber({uuid: uuid.v6(), ...body}, {transaction})
    .catch(err => sequelizeError(err));

  return phoneNumber.dataValues;
};

const updatePhoneNumber = async function (body, transaction) {
  const phoneNumberIndex = body.currentPhoneNumber.map(v => v.uuid).indexOf(body.newPhoneNumber.uuid);

  if (phoneNumberIndex === -1) return {};

  const changes = getChangedFields(body.currentPhoneNumber[phoneNumberIndex], body.newPhoneNumber,
    ['areaCode', 'phoneNumber']);

  if (Object.keys(changes).length === 0) return changes;

  await phoneNumberModel.updatePhoneNumber({uuid: body.newPhoneNumber.uuid, changes}, {transaction})
    .catch(err => sequelizeError(err));

  return changes;
}

module.exports = {
  createPhoneNumber,
  updatePhoneNumber
};