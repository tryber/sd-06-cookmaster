const { Router } = require('express');
const jwt = require('jsonwebtoken');
const model = require('../models/usersModel');

const login = Router();

const secret = 'hashzaoGigante';

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

login.post('/', async (request, response) => {
  if (!request.body.email || !request.body.password) {
    return response.status(401).json({ message: 'All fields must be filled' });
  }

  const user = await model.findUserByEmail(request.body.email);

  if (!user || user.password !== request.body.password) {
    return response.status(401).json({ message: 'Incorrect username or password' });
  }

  const { password, ...userWithoutPassword } = user; // pega todos os campos menos o password e joga na variável userWithoutPassword

  const payload = userWithoutPassword;
  
  const token = jwt.sign(payload, secret, jwtConfig);

  return response.status(200).json({ token });
});

module.exports = login;