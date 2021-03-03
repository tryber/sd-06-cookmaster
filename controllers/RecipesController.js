const { Router } = require('express');
const recipes = require('../models/recipes');
const service = require('../services/RecipeService');
const verifyAuthorization = require('../middlewares/verifyAuthorization');
const returnedStatusAndMessage = require('../util/validations');
const { ObjectId } = require('mongodb');

const RecipesController = new Router();
const status201 = 201;
const status200 = 200;
const status404 = 404;

RecipesController.post('/',
  verifyAuthorization,
  service.validateRecipe,
  async (request, response) => {
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

RecipesController.get('/:id', service.idIsValid, async (request, response) => {
  const { id } = request.params;

  const recipe = await recipes.findById(id);

  return response.status(status200).json(recipe);

  // return (!recipe || id.length < 24)
  //   ? returnedStatusAndMessage(response, status404, 'recipe not found')
  //   : response.status(status200).json(recipe);
});

RecipesController.get('/', async (_request, response) => response
  .status(status200).json(await recipes.getAllRecipes()));

module.exports = RecipesController;
