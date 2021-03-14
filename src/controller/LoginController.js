const { Router } = require('express');
const jwt = require('jsonwebtoken');

const { validateUserLogin } = require('../middlewares/LoginMiddleware'); 

const secret = 'mySecretToken';

const LoginController = new Router();
const OK = 200;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// Post Login
LoginController.post('/', validateUserLogin, (req, res) => {
  const { email, password } = req.body;

  const token = jwt.sign({ data: { email, password } }, secret, jwtConfig);

  res.status(OK).json({ token });
});

module.exports = LoginController;
