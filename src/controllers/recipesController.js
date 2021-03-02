const { Router } = require('express');
const recipeService = require('../services/recipesService');

const router = Router();

const OK = 200;

router.get('/', async (_req, res) => {
  const recipes = await recipeService.getAll();

  res.status(OK).json(recipes);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeService.findById(id);

  res.status(OK).json(recipe);
});

router.post('/', async (req, res) => {
  const { name, user } = req.body;

  const task = await recipeService.create(name, user);

  res.status(200).json(task);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  await recipeService.update(id, user);
  
  const editedUser = {
    _id: id,
    itensSold: req.body,
  };

  res.status(OK).json(editedUser);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deletedUser = await recipeService.findById(id);

  await recipeService.remove(id);

  res.status(OK).json(deletedUser);
});

module.exports = router;