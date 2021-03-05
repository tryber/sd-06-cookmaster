const { Router } = require('express');
const UserService = require('../services/UserServices');

const STATUS_201 = 201;

const UserController = Router();

UserController.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const verified = UserService.middlewareVerifyFields(response, email, password, name);
  if (verified === null) {
    const emailRegistered = await UserService.middlewareEmailRepeated(response, email);
    if (emailRegistered === null) {
        const created = await UserService.userRegister(email, password, name);
        return response.status(STATUS_201).json(created);
    }
  }
});

module.exports = UserController;
