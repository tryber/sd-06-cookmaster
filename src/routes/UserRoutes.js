const { Router } = require('express');
const Rescue = require('express-rescue');

const {
  createUser,
} = require('../controllers/UsersController');

const UsersRouter = Router();

UsersRouter.post('/', Rescue(createUser));

module.exports = UsersRouter;
