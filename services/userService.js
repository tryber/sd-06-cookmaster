const userModels = require('../models/userModel');

const getAll = async () => userModels.getAll();

const getByEmail = async (Email) => await userModels.getByEmail(Email);

const create = async ({ name, email, password, role }) => {
  const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const isValid = validator.test(String(email).toLowerCase());
  if (!name || !email || !isValid || !password) {
    return { error: true, code: 'bad_request', message: 'Invalid entries. Try again.' };
  }
  const user = await userModels.create({ name, email, password, role });
  return user;
};

module.exports = { create, getAll, getByEmail };