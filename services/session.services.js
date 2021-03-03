const { users } = require('../models');
const { validateLogin } = require('../utils/validators');
const { generateToken } = require('../security');

const login = async ({ email, password }) => {
  const user = await users.queryByEmail('users', email);
  validateLogin(email, password, user);
  const { password: _, name, ...data } = user;
  return generateToken(data);
};

module.exports = {
  login,
};
