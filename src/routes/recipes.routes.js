const express = require('express');
const controllers = require('../controllers/recipes');
const middlewares = require('../middlewares');

const recipes = express.Router();

recipes.delete('/:id', middlewares.auth, controllers.deleteRecipe);

recipes.get('/:id', controllers.getRecipes);
recipes.get('/', controllers.getRecipes);

recipes.post('/', middlewares.auth, controllers.createRecipe);

recipes.put('/:id', middlewares.auth, controllers.editRecipe);

module.exports = recipes;
