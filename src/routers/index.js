const express = require('express');

const router = express.Router();

const controllerUser = require('../controllers/UsersController');
const controllerLogin = require('../controllers/LoginController');
const controllerRecipe = require('../controllers/RecipesController');
const { 
  validateUser,
  validateLogin,
  validateToken,
  validateRecipe,
} = require('../services/Validation');

// Rotas de Usuario
router.get('/users', controllerUser.getUserAll);
router.post('/users', validateUser, controllerUser.createUser);

// Rota de Login
router.post('/login', validateLogin, controllerLogin.login);

// Rota de Receitas
router.get('/recipes', controllerRecipe.getAllRecipes);
router.get('/recipes/:id', controllerRecipe.findByIdRecipe);
router.post('/recipes', validateToken, validateRecipe, controllerRecipe.createRecipe);

module.exports = router;
