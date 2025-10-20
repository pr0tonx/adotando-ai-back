const ResponseFactory = require('../utils/ResponseFactory');

const adoptionNotFoundError = function (uuid) {
  return new ResponseFactory().createError(
    'NOT_FOUND',
    'Adoption not found.',
    {
      field: 'uuid',
      rejectedValue: uuid,
      rule: 'Adoption not found.'
    },
    404
  );
};

const conflictError = function (field, value) {
  return new ResponseFactory().createError(
    'CONFLICT',
    `Adoption already registered.`,
    {
      field: `${field.toLowerCase()}`,
      rejectedValue: value,
      rule: `Adoption already registered.`
    },
    409
  );
};

module.exports = {
  adoptionNotFoundError,
  conflictError
};