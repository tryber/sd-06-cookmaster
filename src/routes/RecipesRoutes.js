const { Router } = require('express');
const Rescue = require('express-rescue');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
} = require('../controllers/RecipesController');

const RecipesRouter = Router();

RecipesRouter.put('/:id', (editRecipeById));
RecipesRouter.get('/:id', (getRecipeById));
RecipesRouter.post('/', Rescue(createRecipe));
RecipesRouter.get('/', (getAllRecipes));

module.exports = RecipesRouter;
