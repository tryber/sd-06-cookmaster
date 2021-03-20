const { Router } = require('express');
const jwt = require('jsonwebtoken');
const statusCodes = require('../dictionary/statusCodes');
const UserModel = require('../model/UserModel');
const {
  validateEmailAndPassword,
} = require('../middleware/validations');

const LoginController = new Router();

LoginController.post(
  '/',
  validateEmailAndPassword,
  async (request, response) => {
    const user = request.body;
    const { email, password } = user;
    const secret = 'eluedaluen';
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const result = await UserModel.findUserByCredentials(email, password);
    if (result.length === 0) {
      return response.status(401).json({ message: 'Incorrect username or password' });
    }

    const token = jwt.sign({ email, password }, secret, jwtConfig);
    const tokenContent = { token };

    response.status(statusCodes.OK).json(tokenContent);
  },
);

module.exports = LoginController;