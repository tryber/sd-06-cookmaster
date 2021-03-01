const { Router } = require('express');

const jwt = require('jsonwebtoken');
const Users = require('../services/usersService');
const Login = require('../services/loginService');

const SUCCESS = 200;

const loginRouter = new Router();

loginRouter.post('/', Login.validateLogin, Login.userExists, async (req, res) => {
  const { email } = req.body;
  const user = await Users.getByEmail(email);
  const payload = { id: user.id, email: user.email, role: user.role };
  const token = jwt.sign(payload, 'secret', { algorithm: 'HS256' });
  res.status(SUCCESS).json({ token });
});

module.exports = loginRouter;
