const uuid = require('uuid');

const {sequelize} = require('../database/database');

const ResponseFactory = require('../utils/ResponseFactory');
const {isEmailAvailable} = require('../utils/emailAvailabilty');

const {sequelizeError} = require('../errors/sequelizeError');
const companyErrors = require('../errors/companyErrors');

const companyModel = require('../models/company-model');

const addressService = require('./address-service');
const phoneNumberService = require('./phoneNumber-service');
const companyPhoneNumberService = require('./companyPhoneNumber-service');

const createCompany = async function (body) {
  const transaction = await sequelize.transaction();

  try {
    await isEmailAvailable(body.company.email);

    const addressResponse = await addressService.createAddress(body.address, transaction);

    const companyResponse = await companyModel.createCompany({
      uuid: uuid.v6(),
      ...body.company,
      addressUuid: addressResponse.uuid
    }, {transaction}).then(({dataValues}) => dataValues);

    const phoneNumberResponse = await phoneNumberService.createPhoneNumber(body.phoneNumber, transaction);

    await companyPhoneNumberService.createCompanyPhoneNumber({
      companyUuid: companyResponse.uuid,
      phoneNumberUuid: phoneNumberResponse.uuid
    }, transaction);

    await transaction.commit();

    return new ResponseFactory().createSuccess(
      'Company created successfully',
      {
        uuid: companyResponse.uuid,
        name: companyResponse.name,
        cnpj: companyResponse.cnpj,
        email: companyResponse.email,
        password: companyResponse.password,
        address: addressResponse,
        phoneNumber: phoneNumberResponse
      },
      200
    );
  } catch (err) {
    await transaction.rollback();

    if (err.name === 'SequelizeUniqueConstraintError') {
      const field = err.errors[0].path;
      const value = err.errors[0].value;

      return companyErrors.conflictError(field, value);
    }

    return sequelizeError(err);
  }
};

const getAllCompanies = async function (retrieveAll, limit, page) {
  retrieveAll = !retrieveAll || retrieveAll === 'false';
  limit = parseInt(limit) || 15;
  page = parseInt(page) || 1;

  const companies = await companyModel.getAllCompanies(retrieveAll, limit, page)
    .catch(err => sequelizeError(err));

  return new ResponseFactory().createSuccess(
    companies.data.length === 0 ? 'No companies found for this page.' : 'Companies retrieved successfully.',
    {companies: companies.data.map(company => company.dataValues || {}), meta: companies.meta},
    200
  );
};

const getCompanyById = async function (uuid) {
  const company = await companyModel.getCompanyById(uuid)
    .catch(err => sequelizeError(err));

  if (!company) return companyErrors.companyNotFoundError(uuid);

  return new ResponseFactory().createSuccess(
    'Company retrieved successfully',
    company?.dataValues || {},
    200
  );
};

const updateCompany = async function (body) {
  const transaction = await sequelize.transaction();

  try {
    const company = await companyModel.getCompanyById(body.uuid);

    if (!company) return companyErrors.companyNotFoundError(uuid);

    const addressResponse = await addressService.updateAddress({
      uuid: company.addressUuid, currentAddress: company.address, newAddress: body.address
    }, transaction);

    if (addressResponse instanceof ResponseFactory) return addressResponse;

    const phoneNumberResponse = await phoneNumberService.updatePhoneNumber({
      currentPhoneNumber: company.phoneNumber, newPhoneNumber: body.phoneNumber
    }, transaction);

    if (phoneNumberResponse instanceof ResponseFactory) return phoneNumberResponse;

    await transaction.commit();

    if (Object.keys(addressResponse).length === 0 && Object.keys(phoneNumberResponse).length === 0) {
      return new ResponseFactory().createSuccess('No changes detected.', {}, 200);
    }

    return new ResponseFactory().createSuccess(
      'Company updated successfully',
      {uuid: body.uuid, address: addressResponse, phoneNumber: phoneNumberResponse},
      200
    );
  } catch (err) {
    await transaction.rollback();

    return sequelizeError(err);
  }
};

const updateCompanyPassword = async function (uuid, password) {
  const company = await companyModel.getCompanyById(uuid).catch(err => sequelizeError(err));

  if (!company) return companyErrors.companyNotFoundError(uuid);

  company.password = password;
  await company.save().catch(err => sequelizeError(err));

  return new ResponseFactory().createSuccess(
    'Password updated successfully',
    {},
    200
  );
};

const deleteCompany = async function (uuid) {
  const company = await companyModel.deleteCompany(uuid)
    .catch(err => sequelizeError(err));

  if (!company) return companyErrors.companyNotFoundError(uuid);

  return new ResponseFactory().createSuccess(
    'Company deleted successfully',
    company?.dataValues || {},
    200
  );
};

const reactivateCompany = async function (uuid) {
  const company = await companyModel.reactivateCompany(uuid)
    .catch(err => sequelizeError(err));

  if (!company) return companyErrors.companyNotFoundError(uuid);

  return new ResponseFactory().createSuccess(
    'Company reactivated successfully.',
    company?.dataValues || {},
    200
  );
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  updateCompanyPassword,
  deleteCompany,
  reactivateCompany
};