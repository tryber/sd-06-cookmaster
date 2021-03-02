const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { getAllRecipes, createRecipe, findRecipeById, editRecipeById, validateCreateRecipe,
  validateFindById, validateUpdateById } = require('../services/recipes_Service');

const router = Router();

const OK = 200;
const Created = 201;

router.get('/', async (_req, res) => {
  const recipe = await getAllRecipes();

  res.status(OK).json(recipe);
});

router.post('/', validateCreateRecipe, async (req, res) => {
  const token = req.headers.authorization;
  const secret = 'milhoComLevesTonsDeVerdeMesmoSendoBemAmarelado';
  const decoded = jwt.verify(token, secret);
  const { _id } = decoded.data;

  const newRecipe = await createRecipe(req.body, _id);

  res.status(Created).json(newRecipe);
});

router.get('/:id', validateFindById, async (req, res) => {
  const { id } = req.params;
  const foundRecipe = await findRecipeById(id);

  res.status(OK).json(foundRecipe);
});

router.put('/:id', validateUpdateById, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  await editRecipeById(id, name, ingredients, preparation);
  const editedRecipe = await findRecipeById(id);

  res.status(OK).json(editedRecipe);
});

module.exports = router;
