const { Router } = require('express');

const loginService = require('./loginService');

const { validateLogin } = require('../validations/userValidations');

const loginRouter = new Router();

loginRouter.post('/', validateLogin, (async (req, res) => {
  const requestUser = req.body;
  const { message, token } = await loginService.findByEmail(
    requestUser.email, requestUser.password,
  );

  if (message) return res.status(401).json({ message });
  return res.status(200).json({ token });
}));

module.exports = loginRouter;
