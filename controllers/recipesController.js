const { Router } = require('express');

const {
  createRecipe,
  findProductById,
  getRecipes,
  updateProduct,
  deleteProduct } = require('../services/recipesServices');
const validateNewUser = require('../middlewares/validateNewUser');
const validateToken = require('../middlewares/validateToken');
const validateRecipe = require('../middlewares/validateRecipe');

const router = Router();

const SUCCESS = 200;
const CREATED = 201;
const DFT_ERROR = 400;
const UNPROCESSABLE = 422;

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await findProductById(id);

    if (findProduct === false) {
      return res.status(UNPROCESSABLE).send({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }

    res.status(SUCCESS).send(findProduct);
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

router.put('/:id', validateNewUser, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const updatedProduct = await updateProduct({ name, quantity, id });

    return res.status(SUCCESS).send(updatedProduct);
  } catch (e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await findProductById(id);

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