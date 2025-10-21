const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Company = require('../models/company-model');
const User = require('../models/user-model');

const {sequelizeError} = require('../errors/sequelizeError');
const ResponseFactory = require('../utils/ResponseFactory');

class AuthService {
  static async login({email, password}) {
    try {
      let entity = null;
      let role = null;

      entity = await User.findOne({where: {email: email}});
      if (entity) {
        role = 'user';
      } else {
        entity = await Company.findOne({where: {email: email}});
        if (entity) role = 'company';
      }

      if (!entity) {
        return new ResponseFactory().createError(
          'NOT_FOUND',
          'Email or password is incorrect. Please try again.',
          {
            field: 'email',
            rejectedValue: email,
            rule: 'Email or password is incorrect. Please try again.'
          },
          404
        );
      }

      const isPasswordValid = await bcrypt.compare(password, entity.password);
      if (!isPasswordValid) {
        return new ResponseFactory().createError(
          'NOT_FOUND',
          'Email or password is incorrect. Please try again.',
          {
            field: 'email',
            rejectedValue: email,
            rule: 'Email or password is incorrect. Please try again.'
          },
          404
        );
      }

      const token = jwt.sign(
        {uuid: entity.uuid, role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
      );

      return {token, uuid: entity.uuid, name: entity.name, role};
    } catch (err) {
      if (err === 'Email or password is incorrect. Please try again.') {
        return err;
      }
      sequelizeError(err);
    }
  }
}

module.exports = AuthService;