const {validationResult} = require('express-validator');
const ResponseFactory = require('../utils/ResponseFactory');

module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(new ResponseFactory().createError(
        'VALIDATION_ERROR',
        'One or more fields are invalid.',
        errors.array().map(err => ({
          field: err.path,
          rejectedValue: err.msg.includes('not allowed') ? undefined : err.value,
          rule: err.msg
        }))
      ));
    }

    next();
  };
};