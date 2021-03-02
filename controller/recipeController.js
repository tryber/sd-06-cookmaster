const { Router } = require('express');

const RecipeRouter = new Router();

const RESOLVE = 200;

RecipeRouter.get('/', async (req, res) => {
  res.status(RESOLVE).json('funcionando o recipe router');
});
