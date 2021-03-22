const { Router } = require('express');
const { getUserByEmail } = require('../Services/loginService');
const {
  validateRecipe,
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  validateId,
  putRecipe,
} = require('../Services/recipesService');
const { validateToken } = require('../Authentication/validateToken');
const { validateRecipesHash } = require('../Authentication/validateRecipesHash');


const RecipesRouter = new Router();

const SucessCode = 200;
const CreatedCode = 201;
const NotFoundedCode = 404;

RecipesRouter.get('/', async (_req, res) => {
  const allRecipes = await getAllRecipes();
  return res.status(200).json(allRecipes);
});

RecipesRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return res.status(NotFoundedCode).json({
      message: 'recipe not found',
    });
  }
  return res.status(SucessCode).json(recipe);
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
  return res.status(CreatedCode).json({ recipe });
});

RecipesRouter.put('/:id', validateRecipesHash, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const oldRecipe = await putRecipe(id, name, ingredients, preparation);
  const editedRecipe = { ...oldRecipe, name, ingredients, preparation };
  return res.status(SucessCode).json(editedRecipe);
});

module.exports = { RecipesRouter }; 
