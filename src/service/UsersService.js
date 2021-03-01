const UsersModel = require('../models/Users');
const Validation = require('./validations');
 
const createUser = async (name, email, password) => {
  const validateName = Validation.nameValidation(name);
  const validateEmail = await Validation.emailValidation(email);
  const validatePassword = Validation.passwordValidation(password);

  if (validateName) return validateName;
  if (validateEmail) return validateEmail;
  if (validatePassword) return validatePassword;

  const newUser = await UsersModel.createUser(name, email, password);
  return newUser;
};

module.exports = {
  createUser,
};
