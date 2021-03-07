const { Router } = require('express');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  
} = require('../middlewares/Recipes');
const {
  recipeValidation,
  idValidation,
  userAndRoleValidation,
} = require('../middlewares/validations/RecipeValidations');
const validateJWT = require('../middlewares/auth/validateJWT');

const recipesRouter = new Router();

recipesRouter.post('/', validateJWT, recipeValidation, createRecipe);
recipesRouter.get('/', getAllRecipes);
recipesRouter.get('/:id', idValidation, getRecipeById);
recipesRouter.put('/:id', validateJWT, idValidation, userAndRoleValidation, updateRecipe);
recipesRouter.delete('/:id', validateJWT, idValidation, userAndRoleValidation, deleteRecipe);

module.exports = recipesRouter;