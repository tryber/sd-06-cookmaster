const Users = require('../models/Users');

const createUser = async (name, email, password) => Users.createUser(name, email, password);

const getAllUsers = async () => Users.getAllUsers();

const findUserByEmail = async (email) => Users.findUserByEmail(email);

module.exports = {
  createUser,
  getAllUsers,
  findUserByEmail,
};