const { Router } = require('express');
const { UsersCreateService } = require('../services/UsersService');
const { UserValidation } = require('../middlewares/UsersValidation');
const { getAllUsers } = require('../models/UsersModel');

const UsersController = new Router();

// Requisição teste!
UsersController.get('/', async (_req, res) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
});
// ___________________

// Requisito 1
UsersController.post('/', UserValidation, UsersCreateService);

module.exports = UsersController;