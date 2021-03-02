const { Router } = require('express');
const Recipes = require('../service/RecipesService');
const recipesValidation = require('../schemas/RecipesValidation');
const verifyToken = require('../schemas/verifyAuthorization');

const router = new Router();

const OK = 200;
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

router.get('/', async (_req, res) => {
  try {
    const allRecipes = await Recipes.getAll();

    return res.status(OK).json(allRecipes);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

router.post('/', verifyToken, recipesValidation, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const id = req.user;

    const newPost = await Recipes.create(name, ingredients, preparation, id);

    return res.status(CREATED).json({ recipe: newPost });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
