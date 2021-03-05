const { Router } = require('express');

const validateCreateUser = require('../middlewares/validateCreateUser');
const validateLoginUser = require('../middlewares/validateLoginUser');
const validateCreateRecipe = require('../middlewares/validateCreateRecipe');

const UserController = require('../controllers/UserController');
const RecipesController = require('../controllers/RecipesController');

const appRouters = Router();

appRouters.post('/users', validateCreateUser, UserController.createUser);
appRouters.post('/login', validateLoginUser, UserController.loginUser);

appRouters.post('/recipes', validateCreateRecipe, RecipesController.createRecipe);
appRouters.get('/recipes', RecipesController.searchAllRecipes);
appRouters.get('/recipes/:id', RecipesController.searchRecipeById);
appRouters.put('/recipes/:id', RecipesController.updateRecipeById);
appRouters.delete('/recipes/:id', RecipesController.deleteRecipeById);

module.exports = appRouters;
