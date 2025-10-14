const userService = require('../services/user-service');

const createUser = async function (req, res) {
  const body = {
    user: {
      name: req.body.name,
      email: req.body.email,
      cpf: req.body.cpf,
      password: req.body.password,
      birthday: req.body.birthday
    },
    address: {
      street: req.body.street,
      number: req.body['number'],
      complement: req.body.complement,
      neighborhood: req.body.neighborhood,
      zipCode: req.body.zipCode,
      city: req.body.city,
      state: req.body.state
    },
    phoneNumber: {
      areaCode: req.body.areaCode,
      phoneNumber: req.body.phoneNumber
    }
  };

  const response = await userService.createUser(body);

  return res.status(response.status || 200).send(response);
};

const getAllUsers = async function (req, res) {
  const retrieveAll = req.query.all;
  const limit = req.query.limit;
  const page = req.query.page;

  const response = await userService.getAllUsers(retrieveAll, limit, page);

  return res.status(response.status || 200).send(response);
};

const getUserById = async function (req, res) {
  const {uuid} = req.params;

  const response = await userService.getUserById(uuid);

  res.status(response.status || 200).send(response);
};

const updateUser = async function (req, res) {
  const body = {
    uuid: req.params.uuid,
    address: {
      street: req.body.street,
      number: req.body['number'],
      complement: req.body.complement,
      neighborhood: req.body.neighborhood,
      zipCode: req.body.zipCode,
      city: req.body.city,
      state: req.body.state
    },
    phoneNumber: {
      uuid: req.body.phoneNumberUuid,
      areaCode: req.body.areaCode,
      phoneNumber: req.body.phoneNumber
    }
  };

  const response = await userService.updateUser(body);

  return res.status(response.status || 200).send(response);
};

const updateUserPassword = async function (req, res) {
  const {uuid} = req.params;
  const {password} = req.body;

  const response = await userService.updateUserPassword(uuid, password);

  return res.status(response.status || 200).send(response);
};

const deleteUser = async function (req, res) {
  const {uuid} = req.params;

  const response = await userService.deleteUser(uuid);

  res.status(response.status || 200).send(response);
};


const reactivateUser = async function (req, res) {
  const {uuid} = req.params;

  const response = await userService.reactivateUser(uuid);

  res.status(response.status || 200).send(response);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserPassword,
  deleteUser,
  reactivateUser
};