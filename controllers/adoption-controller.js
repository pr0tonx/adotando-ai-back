const adoptionService = require('../services/adoption-service');

const createAdoption = async function (req, res) {
  const body = req.body;

  const response = await adoptionService.createAdoption(body);

  return res.status(response.status || 200).send(response);
};

const getAllAdoptions = async function (req, res) {
  const limit = req.query.limit;
  const page = req.query.page;

  const response = await adoptionService.getAllAdoptions(limit, page);

  return res.status(response.status || 200).send(response);
};

const returnAdoption = async function (req, res) {
  const {uuid} = req.params;

  const response = await adoptionService.returnAdoption(uuid);

  return res.status(response.status || 200).send(response);
};

module.exports = {
  createAdoption,
  getAllAdoptions,
  returnAdoption
};