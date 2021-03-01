const { Router } = require('express');
const users = require('../models/users');
const service = require('../services/UserService');

const UsersController = new Router();
const status201 = 201;

UsersController.post('/',
  service.validateUser,
  async (request, response) => {
  const { name, email, password } = request.body;
  
  if (!request.body.role) request.body.role = 'user';
  const { insertedId } = await users.createUser(name, password, email, request.body.role);

  const user = {
    _id: insertedId,
    name,
    email,
    password,
    role: request.body.role,
  };

  response.status(status201).json({ user });
});

module.exports = UsersController;
