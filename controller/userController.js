const { Router } = require('express');
const rescue = require('express-rescue');

const userController = Router();
const validation = require('../middlewares/userValidation');

const { validateCreateUSer } = require('../service/userService');
const { CONFLICT, CREATED } = require('../utils/statusCodeHandler');

userController.post('/', validation, rescue(async (request, response) => {
  const user = request.body;
  const userRegistered = await validateCreateUSer(user);

  if (!userRegistered) return response.status(CONFLICT.code).json({ message: CONFLICT.message });

  response.status(CREATED).json({ user: userRegistered });
}));

module.exports = { userController };
