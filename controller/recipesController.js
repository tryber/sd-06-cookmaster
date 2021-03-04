const { Router } = require('express');
const { getUserByEmail } = require('../services/login');
const { validateToken } = require('../auth/validate');
// const { validateRecipeToken } = require('../auth/validateRecipes');

const {
  validateRecipe,
  createNewRecipe,
  // findAllRecipes,
  // findOneRecipe,
  // validateId,
  // updateRecipe,
  // delRecipe,
} = require('../services/recipes');

const recipeRouter = new Router();

recipeRouter.post('/', validateToken, validateRecipe, async (req, res) => {
  const { email } = req.user;
  const user = await getUserByEmail(email);
  const { _id } = user;
  const recipe = {
    ...req.body,
    userId: _id,
  };
  await createNewRecipe(recipe);
  return res.status(201).json({ recipe });
});

module.exports = { recipeRouter };