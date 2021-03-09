const UsersService = require('../services/UsersService');

const CREATED = 201;

// Desafio 1 - Cadastrar User
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UsersService.createUser(name, email, password);
  return res.status(CREATED).json(user);
};

module.exports = {
  createUser,
};
