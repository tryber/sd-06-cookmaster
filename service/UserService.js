const Users = require('../model/UsersModel');

const getAll = async () => Users.getAll();

const registerUser = async (userData) => 
  Users.registerUser(userData);

module.exports = {
  getAll,
  registerUser,
};
