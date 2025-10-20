const {body, query, param} = require('express-validator');

const createDogAllowedFields = ['name', 'gender', 'age', 'breed', 'color', 'description', 'companyUuid', 'status'];

const getAllDogsAllowedFields = ['status', 'limit', 'page'];

const editDogAllowedFields = ['name', 'age', 'color', 'description', 'status'];

const createDogSchema = [
  body('name').exists().withMessage('Name field is required.').bail()
    .isString().withMessage('Name must be a string.').bail()
    .trim().isLength({min: 1, max: 50}).withMessage('Name must have between 1 and 50 characters.'),

  body('gender').exists().withMessage('Gender field is required.').bail()
    .isString().withMessage('Gender must be a string.').bail()
    .trim().isLength({min: 1, max: 1}).withMessage('Gender must not have more than 1 character.').bail()
    .custom((value) => {
      if (value !== 'M' && value !== 'F') throw new Error('Gender must be either "M" or "F".');
      return true;
    }),

  body('age').optional()
    .isInt().withMessage('Age field must be an integer.').bail(),

  body('breed').optional()
    .isString().withMessage('Breed field must be a string.').bail()
    .trim().isLength({min: 1, max: 100}).withMessage('Breed must have between 1 and 100 characters.'),

  body('color').optional()
    .isString().withMessage('Color field must be a string.').bail()
    .trim().isLength({min: 1, max: 100}).withMessage('Color must have between 1 and 50 characters.'),

  body('description').optional()
    .isString().withMessage('Description field must be a string.').bail()
    .trim().isLength({min: 1, max: 500}).withMessage('Description must have between 1 and 500 characters.'),

  body('companyUuid').exists().withMessage('Company uuid field is required.').bail()
    .isString().withMessage('Company uuid field must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Company uuid field must have 36 characters.'),

  body('status').optional()
    .isString().withMessage('Status field must be a string.').bail()
    .custom((value) => {
      if (value === 'available' || value === 'unavailable'
        || value === 'pending' || value === 'adopted') return true;
      throw new Error(
        'Status field must be either "available" or "unavailable".'
      )
    }),

  body().custom(body => {
    const extra = Object.keys(body).filter(key => !createDogAllowedFields.includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const getAllDogsSchema = [
  query('status').optional()
    .custom(value => {
      if (value !== 'true' && value !== 'false') throw new Error('All query parameter must be either "true" or "false"');
      return true;
    }),

  query('limit').optional()
    .custom(value => {
      if (!value.match(/^\d+$/)) throw new Error('Limit query parameter must be a number');
      return true;
    }),

  query('page').optional()
    .custom(value => {
      if (!value.match(/^\d+$/)) throw new Error('Page query parameter must be a number');
      return true;
    }),

  query().custom(body => {
    const extra = Object.keys(body).filter(key => !getAllDogsAllowedFields.includes(key));
    if (extra.length > 0) throw new Error(`The following query parameters are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const getDogByIdSchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),
];

const editDogSchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),

  param().custom(param => {
    const extra = Object.keys(param).filter(key => !['uuid'].includes(key));
    if (extra.length > 0) throw new Error(`The following parameter fields are not allowed: ${extra.join(', ')}.`);
    return true;
  }),

  body('name').optional()
    .isString().withMessage('Name must be a string.').bail()
    .trim().isLength({min: 1, max: 50}).withMessage('Name must have between 1 and 50 characters.'),

  body('age').optional()
    .isInt().withMessage('Age field must be an integer.').bail(),

  body('color').optional()
    .isString().withMessage('Color field must be a string.').bail()
    .trim().isLength({min: 1, max: 100}).withMessage('Color must have between 1 and 50 characters.'),

  body('description').optional()
    .isString().withMessage('Description field must be a string.').bail()
    .trim().isLength({min: 1, max: 500}).withMessage('Description must have between 1 and 500 characters.'),

  body('status').optional()
    .isString().withMessage('Status field must be a string.').bail()
    .custom((value) => {
      if (value === 'available' || value === 'unavailable'
        || value === 'pending' || value === 'adopted') return true;
      throw new Error(
        'Status field must be either "available" or "unavailable".'
      )
    }),

  body().custom(body => {
    const extra = Object.keys(body).filter(key => !editDogAllowedFields.includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const deleteDogSchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),
];

const reactivateDogSchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),
];

module.exports = {
  createDogSchema,
  getAllDogsSchema,
  getDogByIdSchema,
  editDogSchema,
  deleteDogSchema,
  reactivateDogSchema
};