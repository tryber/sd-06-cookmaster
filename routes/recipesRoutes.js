const { Router } = require('express');
const { createRecipes } = require('../controllers/recipesController');

const recipes = Router();

recipes.post('/', createRecipes);

module.exports = recipes;
