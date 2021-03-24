const express = require('express');
const rescue = require('express-rescue');

const validation = require('../middlewares/userValidation');
const { validateCreateUSer } = require('../service/userService');

const { CONFLICT, OK } = require('../utils/statusCodeHandler');

const user = express.Router();

user.post('/', validation, rescue(async (request, response) => {
  const login = request.body;
  const auth = await validateCreateUSer(login);

  if (!auth) return response.status(CONFLICT.code).json({ message: CONFLICT.message });

  response.status(OK).json(auth);
}));

module.exports = { user };
