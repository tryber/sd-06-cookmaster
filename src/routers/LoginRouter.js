const { Router } = require('express');
const { LoginController } = require('../controllers');
const { auth } = require('../middlewares');

const LoginRouter = Router();

LoginRouter.post('/', 
  auth,
  LoginController.userLogin);

module.exports = LoginRouter;