const uuid = require('uuid');

const userModel = require('../models/user-model');
const {sequelize} = require('../database/database');
const ResponseFactory = require('../utils/ResponseFactory');

const addressService = require('./address-service');
const phoneNumberService = require('./phoneNumber-service');
const userPhoneNumberService = require('./userPhoneNumber-service');

const createUser = async function (body) {
  const transaction = await sequelize.transaction();

  const isEmailInUse = await userModel.getUserByEmail(body.user.email);
  if (isEmailInUse) {
    await transaction.rollback();
    return new ResponseFactory().createError(
      'CONFLICT',
      'Email already already registered.',
      {
        field: 'email',
        rejectedValue: body.email,
        rule: 'Email already already registered.'
      },
      409
    );
  }

  const cpfInUse = await userModel.getUserByCpf(body.user.cpf);
  if (cpfInUse) {
    await transaction.rollback();
    return new ResponseFactory().createError(
      'CONFLICT',
      'CPF already already registered.',
      {
        field: 'cpf',
        rejectedValue: body.cpf,
        rule: 'CPF already already registered.'
      },
      409
    );
  }

  const addressResponse = await addressService.createAddress(body.address, transaction);
  if (addressResponse instanceof ResponseFactory) return addressResponse;

  const userRequest = {uuid: uuid.v6(), ...body.user, addressUuid: addressResponse.uuid}

  const userResponse = (await userModel.create(userRequest, transaction)).dataValues;
  if(!userResponse) {
    await transaction.rollback();
    return new ResponseFactory().createError(
      'INTERNAL_SERVER_ERROR',
      'An error occurred while creating the user.',
      {},
      500
    );
  }

  const phoneNumberResponse = await phoneNumberService.createPhoneNumber(body.phoneNumber, transaction);
  if (phoneNumberResponse instanceof ResponseFactory) return phoneNumberResponse;

  const userPhoneNumberResponse = await userPhoneNumberService.createUserPhoneNumber({
    userUuid: userResponse.uuid,
    phoneNumberUuid: phoneNumberResponse.uuid
  }, transaction);
  if (userPhoneNumberResponse instanceof ResponseFactory) return userPhoneNumberResponse;

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
}

const getAllUsers = async function (retrieveAll) {
  const all = !retrieveAll || retrieveAll === 'false';

  const users = await userModel.getAllUsers(all);

  return new ResponseFactory().createSuccess(
    'Users retrieved successfully',
    users.map(user => user?.dataValues || {}),
    200
  );
}

const getUserById = async function (uuid) {
  const user = await userModel.getUserById(uuid);

  if (!user) {
    return new ResponseFactory().createError(
      'NOT_FOUND',
      'User not found.',
      {
        field: 'uuid',
        rejectedValue: uuid,
        rule: 'User not found.'
      },
      404
    );
  }

  return new ResponseFactory().createSuccess(
    'User retrieved successfully',
    user?.dataValues || {},
    200
  );
}

// TODO
const updateUser = async function (body) {
  const transaction = await sequelize.transaction();

  const user = await userModel.updateUser(body, transaction);

  if (user) {
    await transaction.commit();
    return user;
  } else await transaction.rollback();
}

const deleteUser = async function (uuid) {
  // !uuid vai cair em um middleware falando que não acha a rota DELETE /
  const user = await userModel.deleteUser(uuid);

  if (!user) {
    return new ResponseFactory().createError(
      'NOT_FOUND',
      'User not found.',
      {
        field: 'uuid',
        rejectedValue: uuid,
        rule: 'User not found.'
      },
      404
    );
  }

  return new ResponseFactory().createSuccess(
    'User deleted successfully',
    user?.dataValues || {},
    200
  );
}

const reactivateUser = async function (uuid) {
  // !uuid vai cair em um middleware falando que não acha a rota UPDATE /
  const user = await userModel.reactivateUser(uuid);

  if (!user) {
    return new ResponseFactory().createError(
      'NOT_FOUND',
      'User not found.',
      {
        field: 'uuid',
        rejectedValue: uuid,
        rule: 'User not found.'
      },
      404
    );
  }

  return new ResponseFactory().createSuccess(
    'User reactivated successfully.',
    user?.dataValues || {},
    200
  );
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  reactivateUser
}