const express = require('express');

const { createRecipes } = require('../service/recipeService');

const { checkAuthorization } = require('../midddleware/checkAutorization');

const validateToken = require('../auth/validateToken');

const recipeController = express.Router();

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

module.exports = recipeController;