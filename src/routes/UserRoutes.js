const { Router } = require('express');

const validateCreateUser = require('../middlewares/validateCreateUser');
const validateLoginUser = require('../middlewares/validateLoginUser');

const UserController = require('../controllers/UserController');

const appRouters = Router();

appRouters.use('/users', validateCreateUser, UserController.createUser);
appRouters.use('/login', validateLoginUser, UserController.loginUser);

module.exports = appRouters;
