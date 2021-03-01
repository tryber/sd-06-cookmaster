const { Router } = require('express');
const { UsersController } = require('../controllers');

const UserRouter = Router();

UserRouter.post('/', UsersController.registerNewUser);

module.exports = UserRouter;
