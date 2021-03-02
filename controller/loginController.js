const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../Model/usersModel');
const { loginPasswordCheck } = require('../Services/loginPasswordCheck');
const { validateLogin } = require('../Services/validadeLogin');

const secret = 'Possas';

const LoginRouter = new Router();

const SUCCESS = 200;

LoginRouter.get('/', async (req, res) => res.status(SUCCESS).json('login router'));

LoginRouter.post('/', validateLogin, loginPasswordCheck, async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  const data = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign({ data }, secret);
  res.status(SUCCESS).json({ token });
});

module.exports = { LoginRouter, secret };
