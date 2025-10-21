const {body, query, param} = require('express-validator');

const createCompanyAllowedFields = ['name', 'cnpj', 'email', 'password', 'confirmPassword',
  'street', 'number', 'complement', 'neighborhood', 'city', 'zipCode', 'state',
  'phoneNumber', 'areaCode'];

const getAllCompaniesAllowedFields = ['all', 'limit', 'page'];

const updateUserAllowedFields = ['street', 'number', 'complement', 'neighborhood', 'city', 'zipCode', 'state',
  'phoneNumberUuid', 'phoneNumber', 'areaCode'];

const updateCompanyPasswordAllowedFields = ['password', 'confirmPassword'];

const createCompanySchema = [
  body('name').exists().withMessage('Name field is required.').bail()
    .isString().withMessage('Name field must be a string.').bail()
    .trim().isLength({min: 1, max: 150}).withMessage('Name field must have between 1 and 150 characters.'),

  body('cnpj').exists().withMessage('CNPJ field is required.').bail()
    .isString().withMessage('CNPJ field must be a string.').bail()
    .trim().isLength({min: 14, max: 14}).withMessage('CNPJ field must have 14 characters.'),

  body('email').exists().withMessage('Email field is required.').bail()
    .isEmail().withMessage('Email field must be a valid email.')
    .trim().isLength({min: 1, max: 254}).withMessage('Email field must have between 1 and 254 characters.'),

  body('password').exists().withMessage('Password field is required.').bail()
    .isString().withMessage('Password field must be a string.').bail()
    .trim().isLength({min: 8, max: 60}).withMessage('Password field must have between 8 and 60 characters.')
    .matches(/(?=.*[a-z])/).withMessage('Password field must contain at least one lowercase letter.')
    .matches(/(?=.*[A-Z])/).withMessage('Password field must contain at least one uppercase letter.')
    .matches(/(?=.*\d)/).withMessage('Password field must contain at least one number.')
    .matches(/(?=.*[@$!%*?&])/).withMessage('Password field must contain at least one special character (@$!%*?&).'),

  body('confirmPassword').exists().withMessage('Confirm password field is required.').bail()
    .custom((value, {req}) => value === req.body.password).withMessage('Passwords must match.'),

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

  body('areaCode').exists().withMessage('Area code field is required.').bail()
    .isString().withMessage('Area code field must be a string.').bail()
    .trim().isLength({min: 2, max: 2}).withMessage('Area code field must have 2 characters.').bail()
    .matches(/^\d+$/).withMessage('Area code field must only contain numbers.'),

  body().custom(body => {
    const extra = Object.keys(body).filter(key => !createCompanyAllowedFields.includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const getAllCompaniesSchema = [
  query('all').optional()
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
    const extra = Object.keys(body).filter(key => !getAllCompaniesAllowedFields.includes(key));
    if (extra.length > 0) throw new Error(`The following query parameters are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const getCompanyByIdSchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),
]

const updateCompanySchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),

  body('street').optional()
    .isString().withMessage('Street field must be a string.').bail()
    .trim().isLength({min: 1, max: 254}).withMessage('Street field must have between 1 and 254 characters.'),

  body('number').optional()
    .isString().withMessage('Number field must be a string.').bail()
    .trim().isLength({min: 1, max: 10}).withMessage('Number field must have between 1 and 10 characters.'),

  body('complement').optional()
    .isString().withMessage('Complement field must be a string.').bail()
    .trim().isLength({min: 1, max: 100}).withMessage('Complement field must have between 1 and 100 characters.'),

  body('city').optional()
    .isString().withMessage('City field must be a string.').bail()
    .trim().isLength({min: 1, max: 100}).withMessage('City field must have between 1 and 100 characters.'),

  body('state').optional()
    .isString().withMessage('State field must be a string.').bail()
    .trim().isLength({min: 2, max: 2}).withMessage('State field must have 2 characters.').bail()
    .matches(/^[A-Za-z]+$/).withMessage('State field must only contain letters.'),

  body('zipCode').optional()
    .isString().withMessage('Zip code field must be a string.').bail()
    .trim().isLength({min: 8, max: 8}).withMessage('Zip code field must have 8 characters.').bail()
    .matches(/^\d+$/).withMessage('Zip code field must only contain numbers.'),

  body('neighborhood').optional()
    .isString().withMessage('Neighborhood field must be a string.').bail()
    .trim().isLength({min: 1, max: 100}).withMessage('Neighborhood field must have between 1 and 100 characters.'),

  body('phoneNumberUuid').optional()
    .isString().withMessage('phoneNumberUuid field must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('phoneNumberUuid field must have 36 characters.'),

  body('phoneNumber').optional()
    .isString().withMessage('Phone number field must be a string.').bail()
    .trim().isLength({min: 9, max: 9}).withMessage('Phone number field must have 9 characters.').bail()
    .matches(/^\d+$/).withMessage('Phone number field must only contain numbers.'),

  body('areaCode').optional()
    .isString().trim().isLength({min: 2, max: 2}).withMessage('Area code field must have 2 characters.').bail()
    .matches(/^\d+$/).withMessage('Area code field must only contain numbers.'),

  body().custom(value => {
    if ((value.phoneNumber || value.areaCode) && !value.phoneNumberUuid) {
      throw new Error('phoneNumberUuid field is required when phoneNumber or areaCode are provided.');
    }
    return true;
  }),

  param().custom(param => {
    const extra = Object.keys(param).filter(key => !['uuid'].includes(key));
    if (extra.length > 0) throw new Error(`The following parameter fields are not allowed: ${extra.join(', ')}.`);
    return true;
  }),

  body().custom(body => {
    const extra = Object.keys(body).filter(key => !updateUserAllowedFields.includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const updateCompanyPasswordSchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),

  body('password').exists().withMessage('Password field is required.').bail()
    .isString().withMessage('Password field must be a string.').bail()
    .trim().isLength({min: 8, max: 60}).withMessage('Password field must have between 8 and 60 characters.')
    .matches(/(?=.*[a-z])/).withMessage('Password field must contain at least one lowercase letter.')
    .matches(/(?=.*[A-Z])/).withMessage('Password field must contain at least one uppercase letter.')
    .matches(/(?=.*\d)/).withMessage('Password field must contain at least one number.')
    .matches(/(?=.*[@$!%*?&])/).withMessage('Password field must contain at least one special character (@$!%*?&).'),

  body('confirmPassword').exists().withMessage('Confirm password field is required.').bail()
    .custom((value, {req}) => value === req.body.password).withMessage('Passwords must match.'),

  body().custom(body => {
    const extra = Object.keys(body).filter(key => !updateCompanyPasswordAllowedFields.includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const deleteCompanySchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),
];

const reactivateCompanySchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),
];

const getDogsByCompanySchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),

  param().custom(body => {
    const extra = Object.keys(body).filter(key => !['uuid'].includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const createPostSchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),

  body('description').exists().optional()
    .isString().withMessage('Description field must be a string.').bail()
    .trim().isLength({min: 1, max: 500}).withMessage('Description field must have between 1 and 500 characters.'),

  body('dogUuid').exists().withMessage('Dog uuid field is required.').bail()
    .isString().withMessage('Dog uuid field must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Dog uuid field must have 36 characters.'),

  param().custom(body => {
    const extra = Object.keys(body).filter(key => !['uuid'].includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  }),

  body().custom(body => {
    const extra = Object.keys(body).filter(key => !['description', 'dogUuid'].includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const getAllPostsSchema = [
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

const getPostByIdSchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),

  param().custom(body => {
    const extra = Object.keys(body).filter(key => !['uuid'].includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const deletePostSchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),

  param().custom(body => {
    const extra = Object.keys(body).filter(key => !['uuid'].includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
];

const getPostsByCompanySchema = [
  param('uuid').exists().withMessage('Uuid query parameter is required.').bail()
    .isString().withMessage('Uuid query parameter must be a string.').bail()
    .trim().isLength({min: 36, max: 36}).withMessage('Uuid query parameter must have 36 characters.'),

  param().custom(body => {
    const extra = Object.keys(body).filter(key => !['uuid'].includes(key));
    if (extra.length > 0) throw new Error(`The following fields are not allowed: ${extra.join(', ')}.`);
    return true;
  })
]

module.exports = {
  createCompanySchema,
  getAllCompaniesSchema,
  getCompanyByIdSchema,
  updateCompanySchema,
  updateCompanyPasswordSchema,
  deleteCompanySchema,
  reactivateCompanySchema,
  getDogsByCompanySchema,
  createPostSchema,
  getAllPostsSchema,
  getPostByIdSchema,
  deletePostSchema,
  getPostsByCompanySchema
}