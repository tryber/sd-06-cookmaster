const { Router } = require('express');
const users = require('../models/users');
const service = require('../services/UserService');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const UsersController = new Router();
const status201 = 201;
const status200 = 200;

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

UsersController.post('/admin',
verifyAuthorization.verifyAuthorizationAdmin,
service.validateUser,
async (request, response) => {
  request.body.role = 'admin';
  const { name, password, email, role } = request.body;

  const { insertedId } = await users.createUser(name, password, email, role);

  const user = {
    _id: insertedId,
    name,
    email,
    role,
  };

  response.status(status201).json({ user });
});

UsersController.get('/', async (_request, response) => response
  .status(status200).json(await users.getAllUsers()));

module.exports = UsersController;
