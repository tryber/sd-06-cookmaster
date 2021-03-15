const { createUser, createAdmin } = require('./userModel');

const createUserService = async (name, email, password) => {
  const id = await createUser(name, email, password);
  return id;
};

const createAdminService = async (name, email, password) => {
  const id = await createAdmin(name, email, password);
  return id;
};

module.exports = {
  createUserService,
  createAdminService,
};
