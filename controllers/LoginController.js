const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { getByEmail } = require('../models/UsersModel');
const validateLogin = require('../middlewares/LoginMid');

const routerLogin = Router();
const secret = 'shhhh...é segredo';
const SUCCESS = 200;

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

routerLogin.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const user = await getByEmail(email);
  const payload = {
    iss: 'Cookmaster',
    aud: 'indentity',
    // sub: user.name,
    userData: user,
  };
  console.log(password.length, 'senha');
  const token = jwt.sign(payload, secret, jwtConfig);
  console.log(token);
  return res.status(SUCCESS).json({ token });
});

module.exports = routerLogin;
