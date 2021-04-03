const { validateUserService } = require('../middlewares/userValidate');

const userModels = require('../models/User');

const createUserService = async ({ name, email, password }) => {
  const errorValidate = await validateUserService(name, email, password);

  if (errorValidate) return errorValidate;

  const newUser = await userModels.createUser(name, email, password);

  return newUser;
};

module.exports = {
  createUserService,
};