const users = require('../models/users');

const dataValidate = async (name, email, password) => {
  const errMessage = 'Invalid entries. Try again.';
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

  if (!name) return { err: { status: 400, message: errMessage } };

  return false;
};

const create = async (name, email, password) => {
  const errorMessage = await dataValidate(name);

  if (errorMessage) return errorMessage;

  const userCreated = await users.create(name, email, password);

  return userCreated;
};

module.exports = {
  create,
};
