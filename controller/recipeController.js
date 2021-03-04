const Router = require('express');

const { createRecipes, listRecipes, findById, updateRecipes } = require('../service/recipeService');

const { checkAuthorization } = require('../midddleware/checkAutorization');
const checkId = require('../midddleware/chechId');
const checkItens = require('../midddleware/checkRecipes');

const recipeController = new Router();

recipeController.post('/', checkItens, checkAuthorization, async (req, res) => {
  const okay = 201;
  const { _id } = req.payload;
  const recipes = req.body;
  const create = await createRecipes(recipes);
  const { ops } = create;
  ops[0].userId = _id;
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
recipeController.put('/:id', async (req, res) => {
  const okay = 200;
  const { id } = req.params;
  const recipes = req.body;
  await updateRecipes(id, recipes);
  console.log(recipes);
  res.status(okay).json(recipes);
});

module.exports = recipeController;