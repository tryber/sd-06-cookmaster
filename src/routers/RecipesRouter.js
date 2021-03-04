const { Router } = require('express');
const { RecipesController } = require('../controllers');
const { validateRecipeFields, authorization } = require('../middlewares');

const RecipeRouter = Router();

RecipeRouter.post('/',
  validateRecipeFields,
  authorization,
  RecipesController.registerNewRecipe);
RecipeRouter.get('/', RecipesController.listAllRecipes);
RecipeRouter.get('/:id', RecipesController.listRecipeById);
RecipeRouter.put('/:id',
  authorization,
  RecipesController.editRecipe);
RecipeRouter.delete('/:id',
  authorization,
  RecipesController.deleteRecipe);

module.exports = RecipeRouter;
