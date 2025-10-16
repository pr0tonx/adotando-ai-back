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

Company.belongsTo(Address, {as: 'address'});
Address.hasOne(Company, {});

Company.belongsToMany(PhoneNumber, {through: 'companyPhoneNumber', as: 'phoneNumber'});
PhoneNumber.belongsToMany(Company, {through: 'companyPhoneNumber'});

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

