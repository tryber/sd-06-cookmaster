const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { validateInsertData } = require('../services/LoginServices');

const LoginController = new Router();
const secret = 'theIncredibleSecret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

LoginController.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const isValid = await validateInsertData(email, password);
    const token = jwt.sign({ data: [email, password] }, secret, jwtConfig);

    return res.status(isValid[1]).json({ token });
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

module.exports = LoginController;
