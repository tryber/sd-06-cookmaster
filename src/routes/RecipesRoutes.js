const { Router } = require('express');
const Rescue = require('express-rescue');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipe,
} = require('../controllers/RecipesController');

const RecipesRouter = Router();

RecipesRouter.delete('/:id', Rescue(deleteRecipe));
RecipesRouter.put('/:id', Rescue(editRecipeById));
RecipesRouter.get('/:id', Rescue(getRecipeById));
RecipesRouter.post('/', Rescue(createRecipe));
RecipesRouter.get('/', Rescue(getAllRecipes));

module.exports = RecipesRouter;
