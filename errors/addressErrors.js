const ResponseFactory = require('../utils/ResponseFactory');

const addressNotFoundError = function (uuid) {
  return new ResponseFactory().createError(
    'NOT_FOUND',
    'Address not found.',
    {
      field: 'uuid',
      rejectedValue: uuid,
      rule: 'Address not found.'
    },
    404
  );
}

module.exports = {
  addressNotFoundError
}