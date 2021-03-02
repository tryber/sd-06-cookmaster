const { Router } = require('express');
const { UsersController } = require('../controllers');
const { validateFields } = require('../middlewares');

const UserRouter = Router();

UserRouter.post('/',
  validateFields,
  UsersController.registerNewUser);

module.exports = UserRouter;
