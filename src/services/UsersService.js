const User = require('../models/UsersModel');

// Desafio 1 - Cadastrar User
const createUser = async (name, email, password) => User.createUser(name, email, password);

module.exports = {
  createUser,
};
