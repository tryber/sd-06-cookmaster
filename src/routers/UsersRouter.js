const { Router } = require('express');
const { UsersController } = require('../controllers');
const { validateUserFields } = require('../middlewares');

const UserRouter = Router();

UserRouter.post('/',
  validateUserFields,
  UsersController.registerNewUser);

module.exports = UserRouter;
