const {body, query, param} = require('express-validator');

const allowedFields = ['name', 'email', 'cpf', 'password', 'confirmPassword', 'birthday',
  'street', 'number', 'complement', 'neighborhood', 'city', 'zipCode', 'state',
  'phoneNumber', 'areaCode'];

const createUserSchema = [
  body('name').exists().withMessage('Name field is required.').bail()
    .isString().withMessage('Name field must be a string.').bail()
    .trim().isLength({min: 1, max: 150}).withMessage('Name field must have between 1 and 150 characters.'),

  body('email').exists().withMessage('Email field is required.').bail()
    .isEmail().withMessage('Email field must be a valid email.')
    .trim().isLength({min: 1, max: 254}).withMessage('Email field must have between 1 and 254 characters.'),

  body('cpf').exists().withMessage('CPF field is required.').bail()
    .isString().withMessage('CPF field must be a string.').bail()
    .isNumeric().withMessage('CPF field must only contain numbers.').bail()
    .trim().isLength({min: 11, max: 11}).withMessage('CPF field field must have 11 characters.'),

  body('password').exists().withMessage('Password field is required.').bail()
    .isString().withMessage('Password field must be a string.').bail()
    .trim().isLength({min: 8, max: 60}).withMessage('Password field must have between 8 and 60 characters.')
    .matches(/(?=.*[a-z])/).withMessage('Password field must contain at least one lowercase letter.')
    .matches(/(?=.*[A-Z])/).withMessage('Password field must contain at least one uppercase letter.')
    .matches(/(?=.*\d)/).withMessage('Password field must contain at least one number.')
    .matches(/(?=.*[@$!%*?&])/).withMessage('Password field must contain at least one special character (@$!%*?&).'),

  body('confirmPassword').exists().withMessage('Confirm password field is required.').bail()
    .custom((value, {req}) => value === req.body.password).withMessage('Passwords must match.'),

  body('birthday').exists().withMessage('Birthday field is required.').bail()
    .isDate().withMessage('Birthday field must be a date in YYYY-MM-DD format.').bail()
    .trim().isLength({min: 10, max: 10}).withMessage('Birthday field must have 10 characters.').bail()
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Birthday field must be in YYYY-MM-DD format.'),

  body('street').exists().withMessage('Street field is required.').bail()
    .isString().withMessage('Street field must be a string.').bail()
    .trim().isLength({min: 1, max: 254}).withMessage('Street field must have between 1 and 254 characters.'),

  body('number').optional()
    .isString().withMessage('Number field must be a string.').bail()
    .trim().isLength({min: 1, max: 10}).withMessage('Number field must have between 1 and 10 characters.'),

  body('complement').optional()
    .isString().withMessage('Complement field must be a string.').bail()
    .trim().isLength({min: 1, max: 100}).withMessage('Complement field must have between 1 and 100 characters.'),

  body('city').exists().withMessage('City field is required.').bail()
    .isString().withMessage('City field must be a string.').bail()
    .trim().isLength({min: 1, max: 100}).withMessage('City field must have between 1 and 100 characters.'),

  body('state').exists().withMessage('State field is required.').bail()
    .isString().withMessage('State field must be a string.').bail()
    .trim().isLength({min: 2, max: 2}).withMessage('State field must have 2 characters.').bail()
    .matches(/^[A-Za-z]+$/).withMessage('State field must only contain letters.'),

  body('zipCode').exists().withMessage('Zip code field is required.').bail()
    .isString().withMessage('Zip code field must be a string.').bail()
    .trim().isLength({min: 8, max: 8}).withMessage('Zip code field must have 8 characters.').bail()
    .matches(/^\d+$/).withMessage('Zip code field must only contain numbers.'),

  body('neighborhood').optional()
    .isString().withMessage('Neighborhood field must be a string.').bail()
    .trim().isLength({min: 1, max: 100}).withMessage('Neighborhood field must have between 1 and 100 characters.'),

  body('phoneNumber').exists().withMessage('Phone number field is required.').bail()
    .isString().withMessage('Phone number field must be a string.').bail()
    .trim().isLength({min: 9, max: 9}).withMessage('Phone number field must have 9 characters.').bail()
    .matches(/^\d+$/).withMessage('Phone number field must only contain numbers.'),

  body('areaCode').isString().withMessage('Area code field must be a string.').bail()
    .trim().isLength({min: 2, max: 2}).withMessage('Area code field must have 2 characters.').bail()
    .matches(/^\d+$/).withMessage('Area code field must only contain numbers.'),

  body().custom(body => {
    const extra = Object.keys(body).filter(key => !allowedFields.includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const getAllUsersSchema = [
  query('all').optional()
    .custom(value => {
      if (value !== 'true' && value !== 'false') throw new Error('All query parameter must be either "true" or "false"');
      return true;
  })
];

const getUserByIdSchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),
];

module.exports = {
  createUserSchema,
  getAllUsersSchema,
  getUserByIdSchema
}

