const { Router } = require('express');
const { createRecipes, getAllRecipes, getRecipeById } = require('../controllers/recipesController');

const recipes = Router();

recipes.post('/', createRecipes);
recipes.get('/', getAllRecipes);
recipes.get('/:id', getRecipeById);

module.exports = recipes;
