const { Router } = require('express');
const RecipesServices = require('../services/RecipesServices');
const validateJWT = require('../middlewares/validateJWT');
const { recipeValidationRules, validateRecipe } = require('../middlewares/RecipesValidators');
const { idValidationRules, validateId } = require('../middlewares/IdValidators');

const router = Router();

const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await RecipesServices.findById(id);

    return res.status(OK).json(recipe);
  } catch (err) {
    return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
});

router.get('/', async (req, res) => {
  const recipes = await RecipesServices.getAll();

  res.status(OK).json(recipes);
});


router.post('/', validateJWT, recipeValidationRules(), validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = await req.user;
  const data = { name, ingredients, preparation, userId: _id };

  const recipe = await RecipesServices.create(data);

  res.status(CREATED).json({ recipe });
});

router.put('/:id', validateJWT, idValidationRules(), validateId, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { _id } = await req.user;
  const recipe = await RecipesServices.update(id, data);

  if (!recipe) return res.status(NOT_FOUND).json({ message: 'recipe not found' });

  res.status(OK).json({ _id: id, ...data, userId: _id });
});

module.exports = router;
