const Users = require('../model/UsersModel');

const getAll = async () => Users.getAll();

const getById = async (id) => Users.getById(id);

const registerUser = async (userData) => 
  Users.registerUser(userData);

module.exports = {
  getAll,
  registerUser,
  getById,
};
