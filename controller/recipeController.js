const Router = require('express');

const {
  createRecipes,
  listRecipes,
  findById,
  updateRecipes,
  removeRecipe,
} = require('../service/recipeService');

const { checkAuthorization } = require('../midddleware/checkAutorization');
const checkId = require('../midddleware/chechId');
const checkItens = require('../midddleware/checkRecipes');

const recipeController = new Router();

recipeController.post('/', checkItens, checkAuthorization, async (req, res) => {
  const okay = 201;
  const { _id } = req.payload;
  const recipes = req.body;
  recipes.userId = _id;
  const create = await createRecipes(recipes);
  const { ops } = create;
  res.status(okay).json({ recipe: ops[0] });
});
recipeController.get('/', async (_req, res) => {
  const okay = 200;
  const find = await listRecipes();
  res.status(okay).json(find);
});
recipeController.get('/:id', checkId, async (req, res) => {
  const okay = 200;
  const { id } = req.params;
  const find = await findById(id);
  res.status(okay).json(find);
});
recipeController.put('/:id', checkId, checkAuthorization, async (req, res) => {
  const okay = 200;
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const find = await findById(id);
  const { userId } = find;
  console.log();
  const recipe = await updateRecipes(id, { name, ingredients, preparation, userId });

  res.status(okay).json(recipe);
});
recipeController.delete('/:id', checkAuthorization, async (req, res) => {
  const NoContent = 204;
  const { id } = req.params;
  await removeRecipe(id);
  res.status(NoContent).end();
});

module.exports = recipeController;