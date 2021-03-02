const { Router } = require('express');
const { createUser, userValidation } = require('../middlewares/Users');

const usersRouter = new Router();

usersRouter.post('/', userValidation, createUser);

module.exports = usersRouter;