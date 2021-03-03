const Router = require('express');

const { createRecipes, listRecipes, findById } = require('../service/recipeService');

const { checkAuthorization } = require('../midddleware/checkAutorization');
const checkId = require('../midddleware/chechId');

const validateToken = require('../auth/validateToken');

const recipeController = new Router();

recipeController.post('/', checkAuthorization, async (req, res) => {
  const okay = 201;
  const { authorization: token } = req.headers;
  const payload = validateToken(token);
  const { _id } = payload;
  const recipes = req.body; // não estou conseguindo pegar o valor do insominia, esta vindo vazio.
  console.log(recipes);
  const create = await createRecipes(recipes);
  const { ops } = create;
  ops[0].userId = _id;
  res.status(okay).json({ recipes: ops[0] });
});
recipeController.get('/', async (req, res) => {
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

module.exports = recipeController;