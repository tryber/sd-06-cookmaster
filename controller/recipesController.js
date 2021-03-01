const { Router } = require('express');

const recipesController = new Router();
const { verifyToken } = require('../middlewares/verifyToken');
const Recipes = require('../services/recipesServices');

const CREATED = 201;
const SUCCESS = 200;
const NOT_FOUND = 404;

recipesController.post('/', verifyToken, Recipes.validate, async (req, res) => {
  const { id } = req.user;
  const recipe = { ...req.body, id };
  await Recipes.create(recipe);
  return res.status(CREATED).json({ recipe });
});

recipesController.get('/', async (_req, res) => {
  const recipes = await Recipes.getAll();
  return res.status(SUCCESS).json(recipes);
});

recipesController.get('/:id', Recipes.idValidation, async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getById(id);
  if (!recipe) return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  return res.status(SUCCESS).json(recipe);
});

module.exports = recipesController;