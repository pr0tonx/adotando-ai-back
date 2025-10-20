const uuid = require('uuid');

const {sequelize} = require('../database/database');

const ResponseFactory = require('../utils/ResponseFactory');

const {sequelizeError} = require('../errors/sequelizeError');
const adoptionErrors = require('../errors/adoptionErrors');
const dogErrors = require('../errors/dogErrors');

const adoptionModel = require('../models/adoption-model');
const userService = require('./user-service');
const dogService = require('./dog-service');

const createAdoption = async function (body) {
  const transaction = await sequelize.transaction();

  body.status ??= 'active';

  try {
    const user = await userService.getUserById(body.userUuid);

    if (!user.success) return user;

    const dog = await dogService.getDogById(body.dogUuid);

    if (!dog.success) return dog;

    if (dog.data.status !== 'available') return adoptionErrors.conflictError('status', dog.data.status);

    await dogService.changeDogStatus({uuid: body.dogUuid, status: 'adopted'}, transaction)
      .catch(err => sequelizeError(err));

    const adoption = await adoptionModel.createAdoption({
      uuid: uuid.v6(),
      ...body
    }, {transaction}).then(({dataValues}) => {
      return dataValues;
    });

    await transaction.commit();

    return new ResponseFactory().createSuccess(
      'Adoption created successfully',
      adoption,
      200);
  } catch (err) {
    await transaction.rollback();

    return sequelizeError(err);
  }
};

const getAllAdoptions = async function (limit, page) {
  limit = parseInt(limit) || 15;
  page = parseInt(page) || 1;

  const adoptions = await adoptionModel.getAllAdoptions(limit, page)
    .catch(err => sequelizeError(err));

  return new ResponseFactory().createSuccess(
    adoptions.data.length === 0 ? 'No adoptions found for this page.' : 'Adoptions retrieved successfully.',
    {adoptions: adoptions.data.map(adoption => adoption.dataValues || {}), meta: adoptions.meta},
    200
  );
};

const returnAdoption = async function (uuid) {
  const transaction = await sequelize.transaction();

  try {
    const adoption = await adoptionModel.findAdoptionById(uuid);

    if (!adoption) return adoptionErrors.adoptionNotFoundError(uuid);

    const dog = await dogService.getDogById(adoption.dogUuid);

    if (!dog) return dogErrors.dogNotFoundError(uuid);

    await dogService.changeDogStatus({uuid: adoption.dogUuid, status: 'available'}, transaction)
      .catch(err => sequelizeError(err));

    await adoptionModel.returnAdoption(adoption, {transaction})
      .catch(err => sequelizeError(err));

    await transaction.commit();

    return new ResponseFactory().createSuccess(
      'Adoption returned successfully',
      adoption,
      200
    );
  } catch (err) {
    await transaction.rollback();

    return sequelizeError(err);
  }
};

module.exports = {
  createAdoption,
  getAllAdoptions,
  returnAdoption
};