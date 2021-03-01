const express = require('express');
const { Router } = require('express');
const usersController = require('../controllers/usersController');

const app = express();
const recipesRouter = require('./recipesRouter');

const mainRouter = new Router();

mainRouter.use('/recipes', recipesRouter);

// app.post('/users/admin', usersController.registerAdmin);

mainRouter.post('/users', usersController.registerUser);

mainRouter.post('/login', usersController.userLogin);

// usersRouter.post('/images/', userLogin);

module.exports = mainRouter;
