const { Router } = require('express');
const RecipesServices = require('../services/RecipesServices');
const validateJWT = require('../middlewares/validateJWT');
const {
  recipeValidationRules,
  validateRecipe,
} = require('../middlewares/RecipesValidators');

const router = Router();

const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;

router.get('/', async (req, res) => {
  const recipes = await RecipesServices.getAll();

  res.status(OK).json(recipes);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await RecipesServices.findById(id);

    return res.status(OK).json(recipe);
  } catch (err) {
    return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
});

router.post('/', validateJWT, recipeValidationRules(), validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = await req.user;
  const data = { name, ingredients, preparation, userId: _id };

  const recipe = await RecipesServices.create(data);
  console.log(recipe.name);

  res.status(CREATED).json({ recipe });
});

module.exports = router;
