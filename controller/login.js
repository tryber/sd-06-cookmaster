const { Router } = require('express');
const jwt = require('jsonwebtoken');
// const rescue = require('express-rescue');
const models = require('../models');

const STATUS401 = 401;
const STATUS200 = 200;
const STATUS500 = 500;
const login = Router();
const secretPassword = 'Root2021';

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

login.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(STATUS401).json({ message: 'All fields must be filled' });
    }
    const usersByEmail = await models.users.findByEmail(email);
    if (!usersByEmail || usersByEmail.password !== password) {
      return res.status(STATUS401).json({ message: 'Incorrect username or password' });
    }
    delete usersByEmail.password;
    const payload = {
      iss: 'post_api', aud: 'identify', usersByEmail,
    };
    const token = jwt.sign(payload, secretPassword, jwtConfig);
    res.status(STATUS200).json({ token });
  } catch (err) {
    return res.status(STATUS500).json({ message: `Intern Error: ${err}` });
  }
});

module.exports = login;
