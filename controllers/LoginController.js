const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { SUCCESS, UNAUTHORIZED } = require('../utils');
const { getByEmail } = require('../models');
const { validateLogin } = require('../middlewares');
// require {} => function

const routerLogin = Router();
const secret = 'senha';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

routerLogin.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const user = await getByEmail(email);

  if (!user) return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  
  const { password: passwordOnDataBase, ...userWithouPassword } = user;

  if (password !== passwordOnDataBase) {
    return res.status(UNAUTHORIZED)
    .json({ message: 'Incorrect username or password' });
  }
  const payload = {
    iss: 'Cookmaster',
    aud: 'indentity',
    userData: userWithouPassword,
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return res.status(SUCCESS).json({ token });
});

module.exports = routerLogin;
