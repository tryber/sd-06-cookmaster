const { Router } = require('express');
const { LoginController } = require('../controllers');
const { validateLoginFields } = require('../middlewares');

const LoginRouter = Router();

LoginRouter.post('/', 
  validateLoginFields,
  LoginController.userLogin);

module.exports = LoginRouter;