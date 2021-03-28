const { Router } = require('express');
const validateToken = require('../auth/validateToken');
const validation = require('../middlewares/recipesValidation');
const controller = require('../controllers/recipes');

const recipesRouter = new Router();

recipesRouter.post(
  '/',
  validation.name,
  validation.ingredients,
  validation.preparation,
  validateToken,
  controller.createNewRecipe,
);

recipesRouter.get(
  '/',
  controller.getAllRecipes,
);

module.exports = { recipesRouter };