const express = require('express');

const usersController = require('./usersController');

const { validateUser } = require('../validations/userValidations');

const validateToken = require('../authentication/validateToken');

const usersRouter = express.Router();

usersRouter.post('/', validateUser, usersController.createUser);

usersRouter.post('/admin', validateToken, usersController.createAdmin);

module.exports = usersRouter;
