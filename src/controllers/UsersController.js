const UsersService = require('../services/UsersService');

const SUCCESS = 200;
const CREATED = 201;

const getUserAll = async (req, res) => {
  const users = await UsersService.getUserAll();
  res.status(SUCCESS).json({ Users: users });
};

// Desafio 1 - Cadastrar User
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UsersService.createUser(name, email, password);
  res.status(CREATED).json(user);
};

module.exports = {
  createUser,
  getUserAll,
};
