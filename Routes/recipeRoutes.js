const { Router } = require('express');
const controllers = require('../Controllers/recipeControllers');
const validateRecipe = require('../Middlewares/validateRecipe');
const validateToken = require('../Middlewares/validateToken');
const withOrWithoutToken = require('../Middlewares/withOrWithoutToken');
const validateRecipeId = require('../Middlewares/validateRecipe');
const checkRecipeOwner = require('../Middlewares/checkRecipeOwner');
const validateToken2 = require('../auth/validateToken');
const uploadRecipeImage = require('../Multer/multer');

const router = new Router();

router.post('/', validateRecipe, validateToken, async (req, res) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;

  const { _id } = validateToken2(token);

  const newRecipe = await controllers.create(_id, name, ingredients, preparation);

  return res.status(201).send(newRecipe);
});

router.get('/', withOrWithoutToken, async (_req, res) => {
  const recipesList = await controllers.getAll();

  return res.status(200).send(recipesList);
});

router.get('/:id', withOrWithoutToken, validateRecipeId, async (req, res) => {
  const { id } = req.params;

  const recipe = await controllers.findById(id);

  return res.status(200).send(recipe);
});

router.put('/:id', validateRecipeId,
  validateToken, validateRecipe, checkRecipeOwner, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const updatedRecipe = await controllers.updateById(id, name, ingredients, preparation);

  return res.status(200).send(updatedRecipe);
});

router.delete('/:id', validateRecipeId,
  validateToken, checkRecipeOwner, async (req, res) => {
    const { id } = req.params;

    await controllers.deleteById(id);

    return res.status(204).send();
  });
  
router.put('/:id/image', validateRecipeId, validateToken, checkRecipeOwner, uploadRecipeImage);

module.exports = router;
