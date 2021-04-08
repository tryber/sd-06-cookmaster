const { Router } = require('express');
const controller = require('../controllers/loginController');
const validation = require('../validator/loginValidator');

const loginRouter = new Router();

loginRouter.post(
  '/',
  validation.email,
  validation.password,
  controller.loginUser,
);

module.exports = { loginRouter };
