const UsersModel = require('../models/UsersModel');

const getAllUsers = async () => {
  const allUsers = await UsersModel.getAllUsers();
  return allUsers;
};

const createUser = async (name, email, password) => {
  const { _id } = await UsersModel.createUser(name, email, password);
  return ({
    user: {
      name,
      email,
      role: 'user',
      _id,
    },
  });
};

const createAdmin = async (name, email, password) => {
  const { _id } = await UsersModel.createUser(name, email, password);
  return ({
    user: {
      name,
      email,
      role: 'admin',
      _id,
    },
  });
};

module.exports = {
  getAllUsers,
  createUser,
  createAdmin,
};
