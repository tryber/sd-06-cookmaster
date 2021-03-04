const { Router } = require('express');
const RecipesServices = require('../services/RecipesServices');
const validateJWT = require('../middlewares/validateJWT');
const {
  recipeValidationRules,
  validateRecipe,
} = require('../middlewares/RecipesValidators');

const router = Router();

const CREATED = 201;

router.post('/', validateJWT, recipeValidationRules(), validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = await req.user;
  const data = { name, ingredients, preparation, userId: _id };

  const recipe = await RecipesServices.create(data);
  console.log(recipe.name);

  res.status(CREATED).json({ recipe });
});

module.exports = router;
