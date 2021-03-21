const { Router } = require('express');
const { getUserByEmail } = require('../Services/loginService');
const {
  validateToken,
  validateRecipe,
  createNewRecipe,
  getRecipes,
} = require('../Services/recipesService');

const RecipesRouter = new Router();

const twoHundredOne = 201;

RecipesRouter.get('/', async (req, res) => {
  const allRecipes = await getRecipes();
  return res.status(200).json(allRecipes);
});

RecipesRouter.post('/', validateToken, validateRecipe, async (req, res) => {
  const { email } = req.user;
  const user = await getUserByEmail(email);
  const { _id } = user;
  const recipe = {
    ...req.body,
    userId: _id,
  };

  await createNewRecipe(req.body);

  return res.status(twoHundredOne).json({ recipe });
});

module.exports = { RecipesRouter }; 
