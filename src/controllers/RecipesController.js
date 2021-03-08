const { Router } = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const Recipes = require('../services/RecipesService');
const validateJWT = require('../auth/validateJWT');
const { validateRecipe } = require('../middlewares');

const router = new Router();
router.use(bodyParser.json());

const CREATED = 201;

router.post('/', validateJWT, validateRecipe, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const newRecipe = await Recipes.create(name, ingredients, preparation, _id);

  return res.status(CREATED).json(newRecipe);
}));

module.exports = router;
