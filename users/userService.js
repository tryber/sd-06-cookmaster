const { createUser } = require('./userModel');

const createUserService = async (name, email, password) => {
  const id = await createUser(name, email, password);
  return id;
};

module.exports = {
  createUserService,
};
