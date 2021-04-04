const recipesModel = require('./recipesModel');

const validateRecipe = require('../validations/recipesValidations');

const createRecipe = async (newRecipe) => {
  console.log('RECIPES SERVICE');

  const validatedRecipe = validateRecipe(newRecipe);
  if (!validatedRecipe) return { message: 'Invalid entries. Try again.' };

  const createdRecipe = await recipesModel.createRecipe(newRecipe);
  return { createdRecipe };
};

const findById = async (id) => {
  console.log('FIND BY IS SERVICE');

  if (id.length < 24) return { message: 'recipe not found' };

  const recipeById = await recipesModel.findById(id);
  if (recipeById === null) return { message: 'recipe not found' };

  return { recipeById };
};

module.exports = {
  createRecipe,
  findById,
};
