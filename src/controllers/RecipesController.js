const { Router } = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const Recipes = require('../services/RecipesService');
const validateJWT = require('../auth/validateJWT');
const { validateRecipe, validateIdRecipe } = require('../middlewares');

const router = new Router();
router.use(bodyParser.json());

const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;

router.post('/', validateJWT, validateRecipe, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const newRecipe = await Recipes.create(name, ingredients, preparation, _id);

  return res.status(CREATED).json(newRecipe);
}));

router.get('/', rescue(async (_req, res) => {
  const allRecipes = await Recipes.getAll();
   res.status(SUCCESS).json(allRecipes);
}));

router.get('/:id', validateIdRecipe, rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getById(id);

  if (!recipe) {
    return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }

  res.status(SUCCESS).json(recipe);
}));

router.put('/:id', validateJWT, rescue(async (req, res) => {
  const { id } = req.params;
  const arrayRecipes = req.body;
  const { name, ingredients, preparation } = arrayRecipes;
  const updateRecipes = await Recipes.update(id, name, ingredients, preparation);

  res.status(SUCCESS).json(updateRecipes);
}));

router.delete('/:id', validateJWT, rescue(async (req, res) => {
  const { id } = req.params;
  await Recipes.remove(id);
  return res.status(NO_CONTENT).end();
}));

module.exports = router;
