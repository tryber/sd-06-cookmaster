const { UsersModel } = require('../models');

const registerNewUser = async (name, email) => UsersModel.registerNewUser(name, email);

module.exports = {
  registerNewUser,
};
