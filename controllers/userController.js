const { Router } = require('express');
const userService = require('../services/userService');

const usersRouter = new Router();

usersRouter.post('/', userService.verifyFields, async (request, response) => {
  const user = request.body;

  const createdUser = await userService.createUser(user);

  response.status(201).json({ user: createdUser });
});

module.exports = { usersRouter };
