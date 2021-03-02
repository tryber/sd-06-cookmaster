const { Router } = require('express');

const {
  createRecipe,
  findRecipeById,
  getRecipes,
  updateRecipe,
  deleteProduct } = require('../services/recipesServices');
const validatePrivilege = require('../middlewares/validatePrivilege');
const validateToken = require('../middlewares/validateToken');
const validateRecipe = require('../middlewares/validateRecipe');

const router = Router();

const SUCCESS = 200;
const CREATED = 201;
const DFT_ERROR = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE = 422;

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findRecipe = await findRecipeById(id);

    if (findRecipe === false) {
      return res.status(NOT_FOUND).send({
        message: 'recipe not found',
      });
    }

    res.status(SUCCESS).send(findRecipe);
  } catch (e) {
    console.log(e);
  }
});

router.get('/', async (_req, res) => {
  try {
    const recipes = await getRecipes();

    res.status(SUCCESS).send(recipes);
  } catch (e) {
    res.status(DFT_ERROR).send({
      err: 'invalid_data',
      message: 'Something went awry.',
    });
  }
});

router.post('/', validateToken, validateRecipe, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const newRecipe = await createRecipe({ name, ingredients, preparation, userId: _id });

    return res.status(CREATED).send(newRecipe);
  } catch (e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

router.put('/:id', validateToken, validatePrivilege, validateRecipe, async (req, res) => {
  try {
    const { _id } = req.recipe;
    const { name, ingredients, preparation } = req.body;
    const newRecipe = await updateRecipe({ name, ingredients, preparation, _id });

    return res.status(SUCCESS).send(newRecipe);
  } catch (e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await findRecipeById(id);

    if (findProduct === false) {
      return res.status(UNPROCESSABLE).send({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    await deleteProduct(id);
    res.status(SUCCESS).send(findProduct);
  } catch (e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

module.exports = router;