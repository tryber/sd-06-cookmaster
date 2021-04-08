const usersModel = require('../models/usersModel');

const getAllService = async () => {
  const user = await usersModel.getAllUsers();
  return user;
};

const createService = async (name, email, password) => {
  const newUser = await usersModel.createUser(name, email, password);
  return newUser;
};

const createAdminService = async (name, email) => {
  const { _id } = await usersModel.createUser(name, email);
  return ({
    user: {
      _id,
      name,
      email,
      role: 'admin',
    },
  });
};

module.exports = {
  getAllService,
  createService,
  createAdminService,
};
