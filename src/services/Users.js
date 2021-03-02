const Users = require('../models/Users');

const createUser = async (name, email, password) => Users.create(name, email, password);

const getAllUsers = async () => Users.getAll();

const findUserByEmail = async (email) => Users.findByEmail(email);

module.exports = {
  createUser,
  getAllUsers,
  findUserByEmail,
};