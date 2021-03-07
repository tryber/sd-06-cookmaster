const { Router } = require('express');
const { createUser, getAllUsers } = require('../middlewares/Users');
const userValidation = require('../middlewares/validations/UserValidations');

const usersRouter = new Router();

usersRouter.post('/', userValidation, createUser);
usersRouter.get('/', getAllUsers);

module.exports = usersRouter;