const ResponseFactory = require('../utils/ResponseFactory');

const routeNotFoundHandler = function (req, res, next) {
  const response = new ResponseFactory().createError(
    'ROUTE_NOT_FOUND',
    `The route ${req.originalUrl} was not found.`,
    {
      field: 'url',
      rejectedValue: req.originalUrl,
    },
    404
  );

  return res.status(404).send(response);
}

module.exports = routeNotFoundHandler;