const { Router } = require('express');
const { CREATED } = require('../dictionary/statusCodes');
const UserService = require('../service/UserService');
const {
  validateEmailForm,
  validateEmailUniqueness,
  validateMandatoryFields,
} = require('../middleware/validations');

const UserController = new Router();

UserController.post(
  '/',
  validateMandatoryFields,
  validateEmailForm,
  validateEmailUniqueness,
  async (request, response) => {
    const user = request.body;
    const createdUser = await UserService.createUser(user);

    response.status(CREATED).json(createdUser);
  },
);

module.exports = UserController;