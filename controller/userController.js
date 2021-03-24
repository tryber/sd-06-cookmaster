const { Router } = require('express');
const rescue = require('express-rescue');

const validation = require('../middlewares/userValidation');
const { validateCreateUSer } = require('../service/userService');

const { CONFLICT, CREATED } = require('../utils/statusCodeHandler');

const userController = Router();

userController.post('/', validation, rescue(async (request, response) => {
  const login = request.body;
  const auth = await validateCreateUSer(login);

  if (!auth) return response.status(CONFLICT.code).json({ message: CONFLICT.message });

  response.status(CREATED).json(auth);
}));

module.exports = { userController };
