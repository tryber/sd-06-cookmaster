const { Router } = require('express');
const Recipes = require('../services/RecipesService');
const validateJWT = require('../auth/validateJWT');

const router = Router();
const statusCreate = 201;

router.get('/', async (_req, res) => {
  const answer = await Recipes.listRecipes();
  return res.status(200).json(answer);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await Recipes.findById(id);
  if (answer === null || answer.message) {
    return res.status(404)
    .json({ message: 'recipe not found' });
  }
  return res.status(200).json(answer);
});

router.post('/', Recipes.validateRecipe, validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const answer = await Recipes.createRecipes({ name, ingredients, preparation, userId });

  return res.status(statusCreate)
    .json({ recipe: { name, ingredients, preparation, userId, _id: answer.insertedId } });
});

router.put('/:id', validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const { id } = req.params;

  const answer = await Recipes.editById(id, { name, ingredients, preparation, userId });
  return res.status(200)
    .json({ _id: answer.insertedId, name, ingredients, preparation, userId });
});

module.exports = router;
