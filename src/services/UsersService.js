const { UsersModel } = require('../models');

const registerNewUser = async (name, email, password) => UsersModel
  .registerNewUser(name, email, password);

module.exports = {
  registerNewUser,
};
