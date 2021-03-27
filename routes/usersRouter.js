const { Router } = require('express');
const controller = require('../controllers/usersController');
const validation = require('../middlewares/usersValidation');

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