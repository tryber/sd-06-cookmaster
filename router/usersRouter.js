const { Router } = require('express');
const controller = require('../controllers/userController');
const validation = require('../validator/userValidator');

const usersRouter = new Router();

usersRouter.post(
  '/',
  validation.name,
  validation.email,
  validation.password,
  controller.createNewUser,
);

module.exports = {
  usersRouter,
};
