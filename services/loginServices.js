const model = require('../models/usersModel');
const generateToken = require('../data/jwtConfig');

const { invalidLoginField, invalidEmailOrPassword } = require('../utils/errorsLibrary');

const authenticateUser = async (userCredentials) => {
  const { email, password } = userCredentials;
  if (!email || !password) throw invalidLoginField;

  const validUser = await model.getByEmail(email);
  if (!validUser) throw invalidEmailOrPassword;

  return generateToken(validUser);
};

module.exports = { authenticateUser };
