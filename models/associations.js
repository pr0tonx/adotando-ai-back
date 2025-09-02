const User = require('./user-model');
const Company = require('./company-model');
const Address = require('./address-model');
const PhoneNumber = require('./phone-number-model');
const Dog = require('./dog-model');
const Image = require('./image-model');
const Adoption = require('./adoption-model');

User.belongsTo(Address, {
  foreignKey: 'addressUuid',
  as: 'address'
});

Address.belongsTo(User, {
  foreignKey: 'userUuid',
  as: 'user'
});

Company.belongsTo(Address, {
  foreignKey: 'addressUuid',
  as: 'address'
});

Address.belongsTo(Company, {
  foreignKey: 'companyUuid',
  as: 'company'
});

User.belongsToMany(PhoneNumber, {
  through: 'userPhoneNumber',
  foreignKey: 'userUuid',
  otherKey: 'phoneNumberUuid',
  as: 'phones'
});

PhoneNumber.belongsToMany(User, {
  through: 'userPhoneNumber',
  foreignKey: 'phoneNumberUuid',
  otherKey: 'userUuid',
  as: 'users'
});

Company.belongsToMany(PhoneNumber, {
  through: 'companyPhoneNumber',
  foreignKey: 'companyUuid',
  otherKey: 'phoneNumberUuid',
  as: 'phones'
});

PhoneNumber.belongsToMany(Company, {
  through: 'companyPhoneNumber',
  foreignKey: 'phoneNumberUuid',
  otherKey: 'companyUuid',
  as: 'companies'
});

Company.hasMany(Dog, {
  foreignKey: 'companyUuid',
  as: 'dogs'
});

Dog.belongsTo(Company, {
  foreignKey: 'companyUuid',
  as: 'company'
});

Dog.hasMany(Image, {
  foreignKey: 'dogUuid',
  as: 'images'
});

Image.belongsTo(Dog, {
  foreignKey: 'dogUuid',
  as: 'dog'
});

User.hasMany(Adoption, {
  foreignKey: 'userUuid',
  as: 'adoptions'
});

Adoption.belongsTo(User, {
  foreignKey: 'userUuid',
  as: 'user'
});

Dog.hasMany(Adoption, {
  foreignKey: 'dogUuid',
  as: 'adoptions'
});

Adoption.belongsTo(Dog, {
  foreignKey: 'dogUuid',
  as: 'dog'
});

module.exports = {
  User,
  Company,
  Address,
  PhoneNumber,
  Dog,
  Image,
  Adoption
};
