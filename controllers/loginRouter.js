const express = require('express');

const loginRouter = express.Router();
const status200 = 200;
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = 'secret';

// import querys
// const {
//   findByemail,
// } = require('../models/queryLogin');
// -------------------------------------------
// import midllewares
const {
  emailExists,
  emailValid,
  passwordExists,
  InvalidPassword,
} = require('../services/midllewaresLogin');
// -------------------------------------------

loginRouter.post('/', emailExists, emailValid, passwordExists, InvalidPassword,
  async (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign({ email, password }, secret, jwtConfig);
  return res.status(status200).json({ token });
});

module.exports = loginRouter;
