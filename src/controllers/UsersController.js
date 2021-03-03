const { Router } = require('express');
const { createUser, userValidation, getAllUsers } = require('../middlewares/Users');

const usersRouter = new Router();

usersRouter.post('/', userValidation, createUser);
usersRouter.get('/', getAllUsers);

module.exports = usersRouter;