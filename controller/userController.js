const { Router } = require('express');
const usersServices = require('../services/usersServices');
const {
  verifyUsers,
  verifyEmail,
  verifyEmailExists } = require('../middlewares/verifyValidateUsers');

const userController = new Router();
const code = 201;

userController.post('/', verifyEmailExists, verifyUsers, verifyEmail, async (request, response) => {
  const { name, email, password } = request.body;
  console.log(request.body, 'post');
  const createUsers = await usersServices.registerUsers(name, email, password);
  return response.status(code).json(createUsers);
});

userController.get('/', async (_request, response) => {
  const returnAllUsers = await usersServices.getAllUsers();
  return response.status(code).json(returnAllUsers);
});

module.exports = userController; 
