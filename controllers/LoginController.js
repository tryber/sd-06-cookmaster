const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { getByEmail } = require('../models/UsersModel');
const validateLogin = require('../middlewares/LoginMid');

const routerLogin = Router();
const SUCCESS = 200;
const secret = 'shhhh...é segredo';
const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

routerLogin.post('/', validateLogin, async (req, res) => {
  const { email } = req.body;
  const user = await getByEmail(email);
  const payload = {
    iss: 'Cookmaster', 
    aud: 'identity',
    // sub: user.name,
    userData: user,
  };
  
  const token = jwt.sign(payload, secret, jwtConfig);
  return res.status(SUCCESS).json({ token });
});

module.exports = routerLogin;
