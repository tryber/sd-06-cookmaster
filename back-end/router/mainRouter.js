const { Router } = require('express');
const usersController = require('../controllers/usersController');
const { 
  registerUserValidations,
  loginValidations,
} = require('../middlewares/validations/validations');

const recipesRouter = require('./recipesRouter');

const mainRouter = new Router();

mainRouter.use('/recipes', recipesRouter);

// app.post('/users/admin', usersController.registerAdmin);

mainRouter.post('/users', registerUserValidations, usersController.registerUser);

mainRouter.post('/login', loginValidations, usersController.userLogin);

module.exports = mainRouter;
