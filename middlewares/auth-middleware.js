const jwt = require('jsonwebtoken');
const ResponseFactory = require('../utils/ResponseFactory');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).send(new ResponseFactory().createError(
        'UNAUTHORIZED',
        'Missing or invalid Authorization token.',
        {
          field: 'authorization',
          rejectedValue: header,
          rule: 'Bearer token is required.'
        },
        401
      ));
    }

    const token = header.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).send(new ResponseFactory().createError(
          'FORBIDDEN',
          'You do not have permission to access this resource.',
          {
            field: 'role',
            rejectedValue: decoded.role,
            rule: 'You do not have permission to access this resource.'
          },
          403
        ))
      }

      next();
    } catch (err) {
      return res.status(401).send(new ResponseFactory().createError(
        'UNAUTHORIZED',
        'Invalid token.',
        {
          field: 'token',
          rejectedValue: token,
          rule: 'Invalid token.'
        },
        401
      ));
    }
  };
};

module.exports = {
  authMiddleware
};