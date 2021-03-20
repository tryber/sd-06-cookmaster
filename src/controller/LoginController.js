const { Router } = require('express');
const jwt = require('jsonwebtoken');
const statusCodes = require('../dictionary/statusCodes');
const errorMessages = require('../dictionary/errorMessages');
const UserModel = require('../model/UserModel');
const {
  validateEmailAndPassword,
} = require('../middleware/validations');
const { SECRET } = require('../dictionary/constants');

const LoginController = new Router();

LoginController.post(
  '/',
  validateEmailAndPassword,
  async (request, response) => {
    const user = request.body;
    const { email, password } = user;
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

    const result = await UserModel.findUserByCredentials(email, password);
    if (result.length === 0) {
      return response
        .status(statusCodes.UNAUTHORIZED)
        .json({ message: errorMessages.INCORRECT_PASSWORD_OR_EMAIL });
    }

    const token = jwt.sign({ email, password }, SECRET, jwtConfig);
    const tokenContent = { token };

    response.status(statusCodes.OK).json(tokenContent);
  },
);

module.exports = LoginController;