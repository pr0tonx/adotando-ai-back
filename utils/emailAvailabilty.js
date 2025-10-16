const userModel = require('../models/user-model');
const companyModel = require('../models/company-model');

async function isEmailAvailable(email) {
  const [user, company] = await Promise.all([
    userModel.getUserByKey({email}),
    companyModel.getCompanyByKey({email})
  ]);

  if (user || company) {
    const conflictSource = user ? 'User' : 'Company';

    const err = new Error(`Email conflict: ${email}`);
    err.name = 'SequelizeUniqueConstraintError';
    err.errors = [{path: 'email', value: email, message: `Email already used by ${conflictSource}`}];

    throw err;
  }

  return false;
};

module.exports = {
  isEmailAvailable
};