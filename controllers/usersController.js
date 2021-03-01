const { Router } = require('express');

const usersRouter = new Router();

const {
  validateUser,
  checkUniqueEmail,
  registerUser,
} = require('../services/usersService');

const CREATED = 201;
// const CONFLICT = 409;
// const BAD_REQUEST = 400;

usersRouter.post('/', validateUser, checkUniqueEmail, async (request, response) => {
  const userInfo = { ...request.body, role: 'user' };
  await registerUser(userInfo);
  return response.status(CREATED).json(userInfo);
});

module.exports = usersRouter;
