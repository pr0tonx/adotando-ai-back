const {body, query, param} = require('express-validator');

const createAdoptionSchema = [
  body('userUuid').exists().withMessage('Dog uuid field is required.').bail()
    .isString().withMessage('Dog uuid field must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Dog uuid field must have 36 characters.'),

  body('dogUuid').exists().withMessage('Dog uuid field is required.').bail()
    .isString().withMessage('Dog uuid field must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Dog uuid field must have 36 characters.'),

  body().custom(body => {
    const extra = Object.keys(body).filter(key => !['userUuid', 'dogUuid'].includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const getAllAdoptionsSchema = [
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
    const extra = Object.keys(body).filter(key => !['limit', 'page'].includes(key));
    if (extra.length > 0) throw new Error(`The following query parameters are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const returnAdoptionSchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),
];

module.exports = {
  createAdoptionSchema,
  getAllAdoptionsSchema,
  returnAdoptionSchema
};