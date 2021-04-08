const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { validateLogin } = require('../middlewares/Login');
const { findEmail } = require('../models/usersModel');

const routerLogin = Router();

const SUCCESS = 200;

const secret = 'senha12345';

const jwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

routerLogin.post('/', validateLogin, async (req, res) => {
  const { email } = req.body;
  const user = await findEmail(email);
  const payload = {
    iss: 'Cookmaster', 
    aud: 'identity',
    userData: user,
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  return res.status(SUCCESS).json({ token });
});

module.exports = routerLogin;