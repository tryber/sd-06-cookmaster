const Validation = require('./validations');
const Utils = require('./utils');

const generateToken = async (email, password) => {
  const loginValidation = await Validation.loginValidation(email, password);

  if (loginValidation) return loginValidation;

  const token = Utils.generateToken(email, password);
  return token;
};

module.exports = {
  generateToken,
};
