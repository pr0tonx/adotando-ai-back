const companyService = require('../services/company-service');

const createCompany = async function (req, res) {
  const body = {
    company: {
      name: req.body.name,
      cnpj: req.body.cnpj,
      email: req.body.email,
      password: req.body.password,
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

  const response = await companyService.createCompany(body);

  return res.status(response.status || 200).send(response);
};

const getAllCompanies = async function (req, res) {
  const retrieveAll = req.query.all;
  const limit = req.query.limit;
  const page = req.query.page;

  const response = await companyService.getAllCompanies(retrieveAll, limit, page);

  return res.status(response.status || 200).send(response);
};

const getCompanyById = async function (req, res) {
  const {uuid} = req.params;

  const response = await companyService.getCompanyById(uuid);

  res.status(response.status || 200).send(response);
};

const updateCompany = async function (req, res) {
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

  const response = await companyService.updateCompany(body);

  return res.status(response.status || 200).send(response);
};

const updateCompanyPassword = async function (req, res) {
  const {uuid} = req.params;
  const {password} = req.body;

  const response = await companyService.updateCompanyPassword(uuid, password);

  return res.status(response.status || 200).send(response);
};

const deleteCompany = async function (req, res) {
  const {uuid} = req.params;

  const response = await companyService.deleteCompany(uuid);

  res.status(response.status || 200).send(response);
};

const reactivateCompany = async function (req, res) {
  const {uuid} = req.params;

  const response = await companyService.reactivateCompany(uuid);

  res.status(response.status || 200).send(response);
}

const getDogsByCompany = async function (req, res) {
  const {uuid} = req.params;

  const response = await companyService.getDogsByCompany(uuid);

  res.status(response.status || 200).send(response);
};

const createPost = async function (req, res) {
  const body = {
    companyUuid: req.params.uuid,
    description: req.body.description,
    dogUuid: req.body.dogUuid
  };

  const response = await companyService.createPost(body);

  res.status(response.status || 200).send(response);
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  updateCompanyPassword,
  deleteCompany,
  reactivateCompany,
  getDogsByCompany,
  createPost
}