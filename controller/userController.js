const express = require('express');
const rescue = require('express-rescue');

const validation = require('../middlewares/userValidation');
const { CREATED, CONFLICT } = require('../utils/statusCodeHandler').status;

const { validateCreateUSer } = require('../service/userService');

const user = express.Router();

user.post('/', validation, rescue(async (request, response) => {
  const login = request.body;
  const auth = await validateCreateUSer(login);

  if (!auth) return response.status(CONFLICT.code).json(CONFLICT.message);

  response.status(CREATED.code).json(auth);
}));

module.exports = { user };
