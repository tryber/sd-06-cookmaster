const { Router } = require('express');
const Rescue = require('express-rescue');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
} = require('../controllers/RecipesController');

const RecipesRouter = Router();

RecipesRouter.get('/:id', (getRecipeById));
RecipesRouter.post('/', Rescue(createRecipe));
RecipesRouter.get('/', (getAllRecipes));

module.exports = RecipesRouter;
