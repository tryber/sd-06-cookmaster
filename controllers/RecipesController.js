const { Router } = require('express');
const {
  validateJwt,
  verifyValidToken,
  validateUserRole,
} = require('../services/LoginServices');
const { validateRecipeData } = require('../services/RecipesServices');
const {
  recipeRegister,
  getRecipes,
  getRecipeById,
  updateRecipeById,
  getRecipeOwnerId,
} = require('../models/Recipes');

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

RecipesController.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await getRecipeById(id);

    return res.status(recipe[1]).json(recipe[0]);
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

RecipesController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token'});

  try {
    const { email, password } = verifyValidToken(token);
    const currentUserId = await validateJwt(email, password);
    const recipeOwnerId = await getRecipeOwnerId(id);
    await validateUserRole(email, recipeOwnerId, currentUserId);
    const { status } = await updateRecipeById(name, ingredients, preparation, id);

    const updatedRecipe = { name, ingredients, preparation, _id: id, userId: currentUserId };

    return res.status(status).json(updatedRecipe);
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

module.exports = RecipesController;
