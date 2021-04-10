const { Router } = require('express');
const bodyParser = require('body-parser');

const { recipeValidation } = require('../middlewares/recipeValidation');
const { tokenValidation } = require('../auth/tokenValidation');
const {
  newRecipe,
  recipeList,
  getByIdRecipe,
  recipeUpdated,
  recipeDeleted,
  insertImage } = require('../controllers/controllerRecipes');
const uploadImage = require('../middlewares/imageUpload');

const router = new Router();

router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
router.post('/', recipeValidation, tokenValidation, newRecipe, async (_req, _res) => {});
router.get('/', recipeList, async (_req, _res) => {});
router.get('/:id', getByIdRecipe, async (_req, _res) => {});
router.put('/:id', tokenValidation, recipeUpdated, async (_req, _res) => {});
router.delete('/:id', tokenValidation, recipeDeleted, async (_req, _res) => {});
router.put('/:id/image/', tokenValidation, uploadImage, insertImage, async (_req, _res) => {});
module.exports = router;