const recipeRouter = require('express').Router();
const Service = require('../services/recipeService');

recipeRouter.get('/', (req, res) => res.status(200).json({ message: 'Recipes' }));

recipeRouter.post('/', async (req, res) => {
  const { name, ingredients, preparation } = req.body;
   const recipe = await Service.createRecipe(name, ingredients, preparation);
  res.status(201).json({ recipe });
});

module.exports = recipeRouter;