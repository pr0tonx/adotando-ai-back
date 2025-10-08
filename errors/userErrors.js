const ResponseFactory = require('../utils/ResponseFactory');

const userNotFoundError = function (uuid) {
  return new ResponseFactory().createError(
    'NOT_FOUND',
    'User not found.',
    {
      field: 'uuid',
      rejectedValue: uuid,
      rule: 'User not found.'
    },
    404
  );
}

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
}

module.exports = {
  userNotFoundError,
  conflictError
}