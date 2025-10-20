const uuid = require('uuid');

const {sequelize} = require('../database/database');

const ResponseFactory = require('../utils/ResponseFactory');

const {sequelizeError} = require('../errors/sequelizeError');
const dogErrors = require('../errors/dogErrors');
const companyErrors = require('../errors/companyErrors');

const dogModel = require('../models/dog-model');
const {getChangedFields} = require('../utils/getChangedFields');

// TODO adicionar as imagens junto nesse request
const createDog = async function (body) {
  const transaction = await sequelize.transaction();

  body.status ??= 'available';

  try {
    const dogs = await dogModel.createDog({
      uuid: uuid.v6(),
      ...body
    }, {transaction}).then(({dataValues}) => dataValues);

    await transaction.commit();

    return new ResponseFactory().createSuccess(
      'Dog created successfully',
      dogs,
      200)

  } catch (err) {
    await transaction.rollback();

    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return companyErrors.companyNotFoundError(body.companyUuid);
    }

    return sequelizeError(err);
  }
};

const getAllDogs = async function (status, limit, page) {
  status ??= 'available';
  limit = parseInt(limit) || 15;
  page = parseInt(page) || 1;

  const dogs = await dogModel.getAllDogs(status, limit, page)
    .catch(err => sequelizeError(err));

  return new ResponseFactory().createSuccess(
    dogs.data.length === 0 ? 'No dogs found for this page.' : 'Dogs retrieved successfully.',
    {dogs: dogs.data.map(dog => dog.dataValues || {}), meta: dogs.meta},
    200
  );
};

const getDogById = async function (uuid) {
  const dog = await dogModel.getDogById(uuid)
    .catch(err => sequelizeError(err));

  if (!dog) return dogErrors.dogNotFoundError(uuid);

  return new ResponseFactory().createSuccess(
    'Dog retrieved successfully',
    dog?.dataValues || {},
    200
  );
};

const editDog = async function (body) {
  const transaction = await sequelize.transaction();

  try {
    const dog = await dogModel.getDogById(body.uuid);

    if (!dog) return dogErrors.dogNotFoundError(uuid);

    const changes = getChangedFields(dog.dataValues, body, ['name', 'age', 'color', 'description', 'status']);

    if (Object.keys(changes).length !== 0) {
      await dogModel.editDog({uuid: body.uuid, changes}, {transaction})
        .catch(err => sequelizeError(err));
    }

    await transaction.commit();

    return new ResponseFactory().createSuccess(
      changes.length === 0 ? 'No changes detected.' : 'Dog edited successfully.',
      changes,
      200);
  } catch (err) {
    await transaction.rollback();

    return sequelizeError(err);
  }
};

const deleteDog = async function (uuid) {
  const dog = await dogModel.deleteDog(uuid)
    .catch(err => sequelizeError(err));

  if (!dog) return dogErrors.dogNotFoundError(uuid);

  return new ResponseFactory().createSuccess(
    'Dog deleted successfully',
    dog?.dataValues || {},
    200
  );
};

const reactivateDog = async function (uuid) {
  const dog = await dogModel.reactivateDog(uuid)
    .catch(err => sequelizeError(err));

  if (!dog) return dogErrors.dogNotFoundError(uuid);

  return new ResponseFactory().createSuccess(
    'Dog reactivated successfully.',
    dog?.dataValues || {},
    200
  );
};

const getDogByKeys = async function (obj) {
  const dogs = await dogModel.getDogByKeys(obj) || {};

  return dogs.map(value => value.dataValues)
};

const changeDogStatus = async function (values, transaction) {
  const dog = await dogModel.changeDogStatus(values, {transaction});

  return dog.dataValues;
};

module.exports = {
  createDog,
  getAllDogs,
  getDogById,
  editDog,
  deleteDog,
  reactivateDog,
  getDogByKeys,
  changeDogStatus
};