const { Router } = require('express');

const validateCreateUser = require('../middlewares/validateCreateUser');
const validateLoginUser = require('../middlewares/validateLoginUser');
const validateCreateRecipe = require('../middlewares/validateCreateRecipe');

const UserController = require('../controllers/UserController');
const RecipesController = require('../controllers/RecipesController');

const appRouters = Router();

appRouters.use('/users', validateCreateUser, UserController.createUser);
appRouters.use('/login', validateLoginUser, UserController.loginUser);

appRouters.use('/recipes', validateCreateRecipe, RecipesController.createRecipe);

module.exports = appRouters;
