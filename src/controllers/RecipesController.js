const { Router } = require('express');
const { createRecipe, getAllRecipes, recipeValidation } = require('../middlewares/Recipes');
const validateJWT = require('../middlewares/auth/validateJWT');

const recipesRouter = new Router();

recipesRouter.post('/', validateJWT, recipeValidation, createRecipe);
recipesRouter.get('/', getAllRecipes);

module.exports = recipesRouter;