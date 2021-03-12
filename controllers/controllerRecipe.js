const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/serviceRecipes');
const checkRecipe = require('../validationRecipes/checkRecipe');
// const existRecipe = require('../services/validationRecipes/existRecipe');
const auth = require('../services/validationLogin/auth');

const CREATED = 201;
const SUCCESS = 200;
const NOT_FOUND = 404;
const NO_CONTENT = 204;

const router = Router();

router.post('/', checkRecipe, auth, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.infoUser;
    const createdRecipe = await service.createRecipe({ name, ingredients, preparation }, _id);
    res.status(CREATED).json(createdRecipe);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const recipe = await service.getRecipeById(id);
  if (!recipe) {
   return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
  return res.status(SUCCESS).json(recipe);
}));

router.get('/', rescue(async (_req, res) => {
  const product = await service.getAllRecipes();

  return res.status(SUCCESS).json(product);
}));

router.put('/:id', auth, rescue(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.infoUser;
  
  const { name, ingredients, preparation } = req.body;
   const update = await service.updateRecipe({ id, name, ingredients, preparation }, _id);
   console.log('update', update);

   return res.status(SUCCESS).json(update);
 }));

router.delete('/:id', auth, rescue(async (req, res) => {
   const { id } = req.params;
    const erase = await service.excludeRecipe(id);
    res.status(NO_CONTENT).json(erase);
 }));

module.exports = router;