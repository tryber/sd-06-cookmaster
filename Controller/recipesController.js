const { Router } = require('express');
const { getUserByEmail } = require('../Services/loginService');
const { validateToken, validateRecipe, createNewRecipe } = require('../Services/recipesService');

const RecipesRouter = new Router();

const twoHundredOne = 201;

RecipesRouter.get('/', async (req, res) => res.status(200).json('Recipes Router'));

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