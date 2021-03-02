const { Router } = require('express');
const authentication = require('../middlewares/authentication');
const {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
  updateRecipe,
} = require('../controllers/recipesController');

const recipes = Router();

recipes.post('/', authentication, createRecipes);
recipes.get('/', getAllRecipes);
recipes.get('/:id', getRecipeById);
recipes.put('/:id', authentication, updateRecipe);
recipes.delete('/:id', authentication, deleteRecipe);

module.exports = recipes;
