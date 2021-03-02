const { UsersModel } = require('../models');

module.exports = async (password) => {
  const userRegistered = await UsersModel.getAllUsers();

  const isValidPassword = userRegistered.some((user) => user.password === password);

  return isValidPassword;
};
