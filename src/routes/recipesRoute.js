const { Router } = require('express');
const bodyParser = require('body-parser');

const { validateRecipe } = require('../middlewares/validateRecipe');
const { validateToken } = require('../auth/validateToken');
const {
  createRecipe,
  listAllRecipes,
  findRecipeById } = require('../controllers/recipesController');

const router = new Router();

// good practice
router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

router.post('/', validateRecipe, validateToken, createRecipe, async (_req, _res) => {});

router.get('/', listAllRecipes, async (_req, _res) => {});

router.get('/:id', findRecipeById, async (_req, _res) => {});

module.exports = router;