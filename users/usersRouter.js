const express = require('express');

const usersController = require('./usersController');

const { validateUser } = require('../validations/userValidations');

const usersRouter = express.Router();

usersRouter.post('/', validateUser, usersController.createUser);

module.exports = usersRouter;
