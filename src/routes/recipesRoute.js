const { Router } = require('express');
const bodyParser = require('body-parser');

const { validateRecipe } = require('../middlewares/validateRecipe');
const { validateToken } = require('../auth/validateToken');
const {
  createRecipe,
  listAllRecipes,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
  addImageToRecipe } = require('../controllers/recipesController');
const uploadImage = require('../middlewares/upload_image');

const router = new Router();

// good practice
router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

router.post('/', validateRecipe, validateToken, createRecipe, async (_req, _res) => {});

router.get('/', listAllRecipes, async (_req, _res) => {});

router.get('/:id', findRecipeById, async (_req, _res) => {});

router.put('/:id', validateToken, updateRecipe, async (_req, _res) => {});

router.delete('/:id', validateToken, deleteRecipe, async (_req, _res) => {});

router.put('/:id/image/', validateToken, uploadImage, addImageToRecipe, async (_req, _res) => {});

module.exports = router;