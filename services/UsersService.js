const UsersModel = require('../models/UsersModel');

const getAllUsersService = async () => {
  const allUsers = await UsersModel.getAllUsers();
  return allUsers;
};

const createUserService = async (name, email) => {
  const { _id } = await UsersModel.createUser(name, email);
  return ({
    user: {
      name,
      email,
      role: 'user',
      _id,
    },
  });
};

module.exports = {
  getAllUsersService,
  createUserService,
};
