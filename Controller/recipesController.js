const { Router } = require('express');
const { getUserByEmail } = require('../Services/loginService');
const {
  validateToken,
  validateRecipe,
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  validateId,
} = require('../Services/recipesService');

const RecipesRouter = new Router();

const twoHundred = 200;
const twoHundredOne = 201;
const fourHundredFour = 404;

RecipesRouter.get('/', async (_req, res) => {
  const allRecipes = await getAllRecipes();
  return res.status(200).json(allRecipes);
});

RecipesRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return res.status(fourHundredFour).json({
      message: 'recipe not found',
    });
  }
  return res.status(twoHundred).json(recipe);
});

RecipesRouter.post('/', validateToken, validateRecipe, async (req, res) => {
  const { email } = req.user;
  const user = await getUserByEmail(email);
  const { _id } = user;
  const recipe = {
    ...req.body,
    userId: _id,
  };
  
  await createNewRecipe(recipe);

  return res.status(twoHundredOne).json({ recipe });
});

module.exports = { RecipesRouter };