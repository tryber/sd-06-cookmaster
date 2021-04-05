const { CONFLICT, BAD_REQUEST } = require('../errors/status');

const userModels = require('../models/User');

const validateUserService = async (name, email, password) => {
  const errMessage = 'Invalid entries. Try again.';
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const userByEmail = await userModels.findUserByEmail(email);

  if (!name || !email || !password) return { err: { status: BAD_REQUEST, message: errMessage } };

  if (!regex.test(email)) return { err: { status: BAD_REQUEST, message: errMessage } };

  if (userByEmail) return { err: { status: CONFLICT, message: 'Email already registered' } };

  return false;
};

module.exports = {
  validateUserService,
};