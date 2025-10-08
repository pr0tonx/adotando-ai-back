const User = require('./user-model');
const Company = require('./company-model');
const Address = require('./address-model');
const PhoneNumber = require('./phoneNumber-model');
const Dog = require('./dog-model');
const Image = require('./image-model');
const Adoption = require('./adoption-model');

User.belongsTo(Address, {as: 'address'});
Address.hasMany(User);

User.belongsToMany(PhoneNumber, {through: 'userPhoneNumber', as: 'phoneNumber'});
PhoneNumber.belongsToMany(User, {through: 'userPhoneNumber'});

Company.belongsTo(Address, {
  foreignKey: 'addressUuid'
});

Address.hasOne(Company, {
  foreignKey: {
    name: 'addressUuid',
    as: 'addressToCompany'
  }
});

Company.belongsToMany(PhoneNumber, {
  through: 'companyPhoneNumber',
  foreignKey: 'companyUuid',
  otherKey: 'phoneNumberUuid',
  as: 'companyToPhoneNumber'
});

PhoneNumber.belongsToMany(Company, {
  through: 'companyPhoneNumber',
  foreignKey: 'phoneNumberUuid',
  otherKey: 'companyUuid',
  as: 'phoneNumberToCompany'
});

Company.hasMany(Dog, {
  foreignKey: 'companyUuid',
  as: 'companyToDog'
});

Dog.belongsTo(Company, {
  foreignKey: 'companyUuid',
  as: 'dogToCompany'
});

Dog.hasMany(Image, {
  foreignKey: 'dogUuid',
  as: 'dogToImage'
});

Image.belongsTo(Dog, {
  foreignKey: 'dogUuid',
  as: 'imageToDog'
});

User.hasMany(Adoption, {
  foreignKey: 'userUuid',
  as: 'userToAdoption'
});

Adoption.belongsTo(User, {
  foreignKey: 'userUuid',
  as: 'adoptionToUser'
});

Dog.hasMany(Adoption, {
  foreignKey: 'dogUuid',
  as: 'dogToAdoption'
});

Adoption.belongsTo(Dog, {
  foreignKey: 'dogUuid',
  as: 'adoptionToDog'
});

