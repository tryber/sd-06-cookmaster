// const { CONFLICT } = require('../errors/status');

const userModels = require('../models/User');

const validateUserService = async (name, email, password) => {
  const errMessage = 'Invalid entries. Try again.';
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const userByEmail = await userModels.findUserByEmail(email);

  if (!name || !email || !password) return { err: { status: 400, message: errMessage } };

  if (!regex.test(email)) return { err: { status: 400, message: errMessage } };

  if (userByEmail) return { err: { status: 409, message: 'Email already registered' } };

  return false;
};

const createUserService = async ({ name, email, password }) => {
  const errorValidate = await validateUserService(name, email, password);

  if (errorValidate) return errorValidate;

  const newUser = await userModels.createUser(name, email, password);

  return newUser;
};

module.exports = {
  validateUserService,
  createUserService,
};