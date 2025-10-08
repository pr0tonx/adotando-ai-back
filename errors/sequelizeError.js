const ResponseFactory = require('../utils/ResponseFactory');

const sequelizeError = function (err) {
  console.error('[Sequelize Error]:', err);
  return new ResponseFactory().createError(
    'INTERNAL_SERVER_ERROR',
    'An error occurred while retrieving the user. Try again later.',
    {error: err?.message},
    500
  );
};

module.exports = {
  sequelizeError
};
