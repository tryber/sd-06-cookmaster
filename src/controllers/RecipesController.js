const { Router } = require('express');
const {
  createRecipe,
  getAllRecipes,
  recipeValidation,
  getRecipeById,
} = require('../middlewares/Recipes');
const validateJWT = require('../middlewares/auth/validateJWT');

const recipesRouter = new Router();

recipesRouter.post('/', validateJWT, recipeValidation, createRecipe);
recipesRouter.get('/', getAllRecipes);
recipesRouter.get('/:id', getRecipeById);

module.exports = recipesRouter;