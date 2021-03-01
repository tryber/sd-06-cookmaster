const { Router } = require('express');
const { ObjectId } = require('mongodb');
const RecipesService = require('../service/RecipesService');
const validateJWT = require('../auth/validateJWT');

const router = Router();

const invalid = 'Invalid entries. Try again.';

router.post('/recipes', validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  if (!name) return res.status(400).json({ message: invalid });
  if (!ingredients) return res.status(400).json({ message: invalid });
  if (!preparation) return res.status(400).json({ message: invalid });

  const result = await RecipesService.createRecipe(name, ingredients, preparation, userId);

  return res.status(201).json({ recipe: result });
});

router.get('/recipes', async (req, res) => {
  const allRecipes = await RecipesService.getAllRecipes();
  return res.status(200).json(allRecipes);
});

router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(404).json({ message: 'recipe not found' });

  const recipe = await RecipesService.getRecipeById(id);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).json(recipe);
});

module.exports = router;