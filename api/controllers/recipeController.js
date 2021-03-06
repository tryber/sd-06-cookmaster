const recipeRouter = require('express').Router();
const Service = require('../services/recipeService');
const validateToken = require('../auth/validateJWT');

recipeRouter.get('/', async (_req, res) => {
  const recipes = await Service.getAllRecipes();
  res.status(200).json(recipes);
});

recipeRouter.post('/', validateToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipe = await Service.createRecipe(name, ingredients, preparation);
  res.status(201).json({ recipe });
});

recipeRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await Service.getRecipeById(id);
  res.status(200).json(recipe);
});

recipeRouter.put('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipe = await Service.updateRecipe(id, name, ingredients, preparation);
    
  res.status(200).json(recipe);
});

module.exports = recipeRouter;
