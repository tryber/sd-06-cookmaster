const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { validateUser, validateLogin, searchLogin } = require('../services/loginService');

const SUCCESS = 200;

const secret = 'anything';

const login = new Router();

login.get('/', async (req, res) => {
  res.status(SUCCESS).json('ok');
});

login.post('/', validateLogin, validateUser, async (req, res) => {
  const { email } = req.body;
  const user = await searchLogin(email);
  const data = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign({ data }, secret);

  res.status(SUCCESS).json({ token });
});

module.exports = { login };