const { Router } = require('express');

const jwt = require('jsonwebtoken');
const Users = require('../services/usersService');
const Login = require('../services/loginService');

const SUCCESS = 200;

const loginRouter = new Router();

loginRouter.post('/', Login.validateLogin, Login.userExists, async (req, res) => {
  const { email } = req.body;
  const { _id, role } = await Users.getByEmail(email);
  const data = { id: _id, email, role };
  const token = jwt.sign({ data }, 'secret');
  res.status(SUCCESS).json({ token });
});

module.exports = loginRouter;
