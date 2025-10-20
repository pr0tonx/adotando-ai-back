const dogService = require('../services/dog-service');

const createDog = async function (req, res) {
  const {body} = req;

  const response = await dogService.createDog(body);

  return res.status(response.status || 200).send(response);
};

const getAllDogs = async function (req, res) {
  const status = req.query.status;
  const limit = req.query.limit;
  const page = req.query.page;

  const response = await dogService.getAllDogs(status, limit, page);

  return res.status(response.status || 200).send(response);
}

const getDogById = async function (req, res) {
  const {uuid} = req.params;

  const response = await dogService.getDogById(uuid);

  res.status(response.status || 200).send(response);
}

const editDog = async function (req, res) {
  const body = {uuid: req.params.uuid, ...req.body};

  const response = await dogService.editDog(body);

  return res.status(response.status || 200).send(response);
};

const deleteDog = async function (req, res) {
  const {uuid} = req.params;

  const response = await dogService.deleteDog(uuid);

  res.status(response.status || 200).send(response);
};

const reactivateDog = async function (req, res) {
  const {uuid} = req.params;

  const response = await dogService.reactivateDog(uuid);

  res.status(response.status || 200).send(response);
};

const deleteDogImage = async function (req, res) {
  const {uuid} = req.params;

  const response = await dogService.deleteDogImage(uuid);

  res.status(response.status || 200).send(response);
}

module.exports = {
  createDog,
  getAllDogs,
  getDogById,
  editDog,
  deleteDog,
  reactivateDog,
  deleteDogImage
};