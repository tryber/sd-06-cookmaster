const usersModel = require('../models/usersModel');

const getAllService = async () => {
  const user = await usersModel.getAllUsers();
  return user;
};

const createService = async (name, email, password) => {
  const newUser = await usersModel.createUser(name, email, password);
  return newUser;
};

module.exports = {
  getAllService,
  createService,
};
