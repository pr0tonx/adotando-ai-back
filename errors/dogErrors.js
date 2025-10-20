const ResponseFactory = require('../utils/ResponseFactory');

const dogNotFoundError = function (uuid) {
  return new ResponseFactory().createError(
    'NOT_FOUND',
    'Dog not found.',
    {
      field: 'uuid',
      rejectedValue: uuid,
      rule: 'Dog not found.'
    },
    404
  );
};

module.exports = {
  dogNotFoundError
}