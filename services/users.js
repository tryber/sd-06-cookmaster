const modelsUsers = require('../models');
const ThrowError = require('../middlewares/handleConfigError');

const create = async (name, email, password, role = 'user') => {
  if (!name || !email || !password) {
    throw new ThrowError('Invalid entries. Try again.', 'invalid_entries');
  }
  const validEmail = /[\w]{3,30}@[a-zA-Z]{3,8}.[\w]{2,7}/mg;

  if (!validEmail.test(email)) {
    throw new ThrowError('Invalid entries. Try again.', 'invalid_entries');
  }
  const usersByEmail = await modelsUsers.users.findByEmail(email);
  if (usersByEmail) {
    throw new ThrowError('Email already registered', 'email_already_exists');
  }
  return modelsUsers.users.create(name, email, password, role);
};

module.exports = {
  create,
};
