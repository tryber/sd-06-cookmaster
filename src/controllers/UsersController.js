const { Router } = require('express');
const { UsersCreateService } = require('../services/UsersService');
const { 
  UserValidation,
} = require('../middlewares/UsersValidation');

const UsersController = new Router();

// Requisição teste!
UsersController.get('/', (req, res) => {
  res.send('Hello World!');
});

UsersController.post('/', UserValidation, UsersCreateService);

module.exports = UsersController;