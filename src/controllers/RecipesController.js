const { Router } = require('express');
const {
  createRecipe,
  getAllRecipes,
  recipeValidation,
  idValidation,
  getRecipeById,
  updateRecipe,
  
} = require('../middlewares/Recipes');
const validateJWT = require('../middlewares/auth/validateJWT');

const recipesRouter = new Router();

recipesRouter.post('/', validateJWT, recipeValidation, createRecipe);
recipesRouter.get('/', getAllRecipes);
recipesRouter.get('/:id', idValidation, getRecipeById);
recipesRouter.put('/:id', validateJWT, idValidation, updateRecipe);

module.exports = recipesRouter;