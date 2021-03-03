const UsersModels = require('../models/UsersModels');

const findByEmail = async (email) => {
  const user = await UsersModels.findByEmail(email);

  return user;
};

const findByPassword = async (password) => {
  const user = await UsersModels.findByPassword(password);

  return user;
};

const create = async (name, email, password, role = 'user') => {
  const usedEmail = await UsersModels.findByEmail(email);
  if (usedEmail) return false;
  const user = await UsersModels.create(name, email, password, role);

  return {
    user,
  };
};

module.exports = {
  findByEmail,
  findByPassword,
  create,
};
