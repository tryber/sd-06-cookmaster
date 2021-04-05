const { Router } = require('express');
const userService = require('../services/userService');

const loginRouter = new Router();

loginRouter.post('/', userService.verifyLogin, async (request, response) => {
  const user = request.body;

  const loggedUser = await userService.loginUser(user);

  const token = await userService.createToken(loggedUser);

  response.status(200).json({ token });
});

module.exports = { loginRouter };
