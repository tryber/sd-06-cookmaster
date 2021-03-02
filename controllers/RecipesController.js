const { Router } = require('express');
const { validateJwt, verifyValidToken } = require('../services/LoginServices');
const { validateRecipeData } = require('../services/RecipesServices');
const { recipeRegister, getRecipes } = require('../models/Recipes');

const RecipesController = new Router();

RecipesController.post('/', async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;

  try {
    const { email, password } = verifyValidToken(token);
    const userId = await validateJwt(email, password);
    const {
      validName, validIngredients, validPreparation,
    } = validateRecipeData(name, ingredients, preparation);
    const registeredRecipe = await recipeRegister(
      validName, validIngredients, validPreparation, userId,
    );

    return res.status(registeredRecipe[1]).json(registeredRecipe[0]);
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

RecipesController.get('/', async (_req, res) => {
  const recipes = await getRecipes();

  return res.status(recipes[1]).json(recipes[0]);
});

module.exports = RecipesController;
