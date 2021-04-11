const { Router } = require('express');

const loginService = require('./loginService');

const { validateLogin } = require('../validations/userValidations');

const loginRouter = new Router();

loginRouter.post('/', validateLogin, (async (req, res) => {
  console.log('LOGIN CONTROLLER');
  const { email, password } = req.body;
  const { message, token, _id } = await loginService.findByEmail(email, password);

  req.userIdLogin = _id;

  if (message) return res.status(401).json({ message });
  return res.status(200).json({ token });
}));

module.exports = loginRouter;
