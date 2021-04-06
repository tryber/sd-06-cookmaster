const { Router } = require('express');

const UsersController = require('../controllers/UsersController');

const usersController = new UsersController();

const loginRouter = Router();

loginRouter.post('/', usersController.login);

module.exports = loginRouter;