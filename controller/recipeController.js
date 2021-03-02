const { Router } = require('express');

const RecipeRouter = new Router();

RecipeRouter.get('/', async (req, res) => {
  res.status(200).json('funcionando o recipe router');
});
