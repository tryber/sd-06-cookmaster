const { Router } = require('express');
const recipes = require('../models/recipes');
const service = require('../services/RecipeService');

const RecipesController = new Router();
const status201 = 201;

RecipesController.post('/', service.validateRecipe, async (request, response) => {
  const { body: { name, ingredients, preparation }, user: { _id: id } } = request;
  const { insertedId } = await recipes.insertRecipe(name, ingredients, preparation, id);

  const recipe = {
    name,
    ingredients,
    preparation,
    userId: id,
    _id: insertedId,
  };
  
  return response.status(status201).json({ recipe });
});

module.exports = RecipesController;
