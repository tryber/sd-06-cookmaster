const User = require('../models/UsersModel');

const getUserAll = async () => {
  const users = await User.getUserAll();
  return users;
};

const findByOneEmail = async (email) => {
  const user = await User.findByOneEmail(email);
  return user;
};

// Desafio 1 - Cadastrar User
const createUser = async (name, email, password) => User.createUser(name, email, password);

module.exports = {
  createUser,
  getUserAll,
  findByOneEmail,
};
