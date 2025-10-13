const uuid = require('uuid');

const {sequelize} = require('../database/database');

const ResponseFactory = require('../utils/ResponseFactory');

const {sequelizeError} = require('../errors/sequelizeError');
const userErrors = require('../errors/userErrors');

const userModel = require('../models/user-model');

const addressService = require('./address-service');
const phoneNumberService = require('./phoneNumber-service');
const userPhoneNumberService = require('./userPhoneNumber-service');

const createUser = async function (body) {
  const transaction = await sequelize.transaction();

  try {
    const addressResponse = await addressService.createAddress(body.address, transaction);

    const userResponse = await userModel.create({
      uuid: uuid.v6(),
      ...body.user,
      addressUuid: addressResponse.uuid
    }, {transaction}).then(({dataValues}) => dataValues);

    const phoneNumberResponse = await phoneNumberService.createPhoneNumber(body.phoneNumber, transaction);

    await userPhoneNumberService.createUserPhoneNumber({
      userUuid: userResponse.uuid,
      phoneNumberUuid: phoneNumberResponse.uuid
    }, transaction);

    await transaction.commit();

    return new ResponseFactory().createSuccess(
      'User created successfully',
      {
        uuid: userResponse.uuid,
        name: userResponse.name,
        cpf: userResponse.cpf,
        email: userResponse.email,
        password: userResponse.password,
        birthday: userResponse.birthday,
        address: addressResponse,
        phoneNumber: phoneNumberResponse,
      },
      200
    );
  } catch (err) {
    await transaction.rollback();

    if (err.name === 'SequelizeUniqueConstraintError') {
      const field = err.errors[0].path;
      const value = err.errors[0].value;

      return userErrors.conflictError(field, value);
    }

    return sequelizeError(err);
  }
};

const getAllUsers = async function (retrieveAll, limit, page) {
  retrieveAll = !retrieveAll || retrieveAll === 'false';
  limit = parseInt(limit) || 15;
  page = parseInt(page) || 1;

  const users = await userModel.getAllUsers(retrieveAll, limit, page)
    .catch(err => sequelizeError(err));

  return new ResponseFactory().createSuccess(
    users.data.length === 0 ? 'No users found for this page.' : 'Users retrieved successfully',
    {users: users.data.map(user => user.dataValues || {}), meta: users.meta},
    200
  );
};

const getUserById = async function (uuid) {
  const user = await userModel.getUserById(uuid)
    .catch(err => sequelizeError(err));

  if (!user) return userErrors.userNotFoundError(uuid);

  return new ResponseFactory().createSuccess(
    'User retrieved successfully',
    user?.dataValues || {},
    200
  );
};

// TODO
const updateUser = async function (body) {
  const transaction = await sequelize.transaction();

  const user = await userModel.updateUser(body, transaction);

  if (user) {
    await transaction.commit();
    return user;
  } else await transaction.rollback();
};

const deleteUser = async function (uuid) {
  const user = await userModel.deleteUser(uuid)
    .catch(err => sequelizeError(err));

  if (!user) return userErrors.userNotFoundError(uuid);

  return new ResponseFactory().createSuccess(
    'User deleted successfully',
    user?.dataValues || {},
    200
  );
};

const reactivateUser = async function (uuid) {
  const user = await userModel.reactivateUser(uuid)
    .catch(err => sequelizeError(err));

  if (!user) return userErrors.userNotFoundError(uuid)

  return new ResponseFactory().createSuccess(
    'User reactivated successfully.',
    user?.dataValues || {},
    200
  );
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  reactivateUser
}