const { Router } = require('express');
const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const models = require('../models');

const STATUS401 = 401;
const STATUS200 = 200;
const login = Router();
const secretPassword = 'Root2021';

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

login.post('/', rescue(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(STATUS401).json({ message: 'All fields must be filled' });
  }
  const usersByEmail = await models.users.findByEmail(email);
  if (!usersByEmail || usersByEmail.password !== password) {
    return res.status(STATUS401).json({ message: 'Incorrect username or password' });
  }
  const { password: _, ...userWithoutPassword } = usersByEmail;
  const payload = { userWithoutPassword };
  const token = jwt.sign(payload, secretPassword, jwtConfig);
  res.status(STATUS200).json({ token });
}));

module.exports = login;
