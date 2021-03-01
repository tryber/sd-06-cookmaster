const { Router } = require('express');
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

module.exports = router;