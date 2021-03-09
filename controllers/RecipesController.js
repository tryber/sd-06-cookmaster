const { Router } = require('express');
const Recipes = require('../services/RecipesService');
const validateJWT = require('../auth/validateJWT');

const router = Router();
const statusCreate = 201;

router.post('/', Recipes.validateRecipe, validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const answer = await Recipes.createRecipes({ name, ingredients, preparation, userId });

  return res.status(statusCreate)
    .json({ recipe: { name, ingredients, preparation, userId, _id: answer.insertedId } });
});

module.exports = router;
