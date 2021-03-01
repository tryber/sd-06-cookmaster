const { Router } = require('express');

const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const {
  validateLogin,
  userExists,
} = require('../services/loginService');

const loginRouter = new Router();

const SUCCESS = 200;

loginRouter.post('/', validateLogin, userExists, async (request, response) => {
  const { email } = request.body;
  const user = await usersModel.getOneUser(email);
  const { _id } = user;
  const data = { id: _id, email: user.email, role: user.role };
  const token = jwt.sign({ data }, '1234');
  return response.status(SUCCESS).json({ token });
});

module.exports = loginRouter;
