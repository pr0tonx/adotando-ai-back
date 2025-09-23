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
  }

  const response = await userService.createUser(body);

  return res.status(response.status || 200).send(response);
}

const getAllUsers = async function (req, res) {
  const retrieveAll = req.query.all

  const response = await userService.getAllUsers(retrieveAll);

  return res.status(response.status || 200).send(response);
}

// TODO
const getUserById = async function (req, res, next) {
  const {uuid} = req.params;

  const response = await userService.getUserById(uuid);

  res.response = response;
  res.status(response.status || 200).send(response);
}

// TODO
const updateUser = async function (req, res) {
  try {
    const {uuid} = req.params;
    const body = {...req.body}

    const user = await userService.updateUser(uuid, body);

    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
}

const deleteUser = async function (req, res) {
  const {uuid} = req.params;

  const response = await userService.deleteUser(uuid);

  res.status(response.status || 200).send(response);
}


const reactivateUser = async function (req, res) {
  const {uuid} = req.params;

  const response = await userService.reactivateUser(uuid);

  res.status(response.status || 200).send(response);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  reactivateUser
}