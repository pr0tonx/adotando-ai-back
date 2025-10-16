const ResponseFactory = require('../utils/ResponseFactory');

const companyNotFoundError = function (uuid) {
  return new ResponseFactory().createError(
    'NOT_FOUND',
    'Company not found.',
    {
      field: 'uuid',
      rejectedValue: uuid,
      rule: 'Company not found.'
    },
    404
  );
};

const conflictError = function (field, value) {
  return new ResponseFactory().createError(
    'CONFLICT',
    `${field} already registered.`,
    {
      field: `${field.toLowerCase()}`,
      rejectedValue: value,
      rule: `${field} already registered.`
    },
    409
  );
};

module.exports = {
  companyNotFoundError,
  conflictError
};