const jwt = require('jsonwebtoken');
const RecipesActions = require('../models/recipesActions');
const { statusCode } = require('../Dicio');

const creatingRecipe = async (request, response) => {
  const { authorization } = request.headers;
  const { name, ingredients, preparation } = request.body;

  const { _id: userId } = jwt.decode(authorization);

  const { insertedId } = await RecipesActions.createRecipe(
    name, ingredients, preparation, userId,
  );
  const newRecipe = { _id: insertedId, name, ingredients, preparation, userId };

  return response.status(statusCode.SUCCESS_CREATED).send({ recipe: newRecipe });
};

const displayAllRecipes = async (_request, response) => {
  const allRecipes = await RecipesActions.getAllRecipes();
  return response.status(statusCode.SUCCESS).send(allRecipes);
};

const displaySpecificRecipe = async (request, response) => {
  const { id } = request.params;
  const specificRecipe = await RecipesActions.getRecipeById(id);
  return response.status(statusCode.SUCCESS).send(specificRecipe);
};

const updatingRecipe = async (request, response) => {
  const { authorization } = request.headers;
  const { id } = request.params;
  const { name, ingredients, preparation } = request.body;
  const { _id: userId } = jwt.decode(authorization);

  await RecipesActions.updateRecipe(name, ingredients, preparation, id);
  const updatedRecipe = { id, name, ingredients, preparation, userId };

  return response.status(statusCode.SUCCESS).send(updatedRecipe);
};

module.exports = {
  creatingRecipe,
  displayAllRecipes,
  displaySpecificRecipe,
  updatingRecipe,
};
