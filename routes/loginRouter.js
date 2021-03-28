const { Router } = require('express');
const controller = require('../controllers/login');
const validation = require('../middlewares/loginValidation');

const loginRouter = new Router();

loginRouter.post(
  '/',
  validation.email,
  validation.password,
  controller.loginUser,
);

module.exports = { loginRouter };