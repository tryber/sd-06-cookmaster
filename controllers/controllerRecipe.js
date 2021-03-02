const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/serviceUsers');

const CREATED = 201;
const SUCCESS = 200;

const router = Router();

router.post('/', rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
 
    const createdRecipe = await service.createRecipe({ name, ingredients, preparation });
    return res.status(CREATED).json(createdRecipe);
}));

// router.post('/:id/image/', rescue(async (req, res) => {
//   const { name, ingredients, preparation } = req.body;
 
//     const createdRecipe = await service.createRecipe({ name, ingredients, preparation });
//     return res.status(CREATED).json(createdRecipe);
// }));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const recipe = await service.getRecipeById(id);
  return res.status(SUCCESS).json(recipe);
}));

router.get('/', rescue(async (req, res) => {
  const product = await service.getAllRecipes();

  return res.status(SUCCESS).json(product);
}));

router.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  await service.updateRecipe({ id, name, ingredients, preparation });

  return res.status(SUCCESS).json({ id, name, ingredients, preparation });
}));

router.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  
  await service.excludeProduct(id);
  return res.status(SUCCESS).json({ name, ingredients, preparation });
}));

module.exports = router;