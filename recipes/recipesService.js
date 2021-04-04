const recipesModel = require('./recipesModel');

const validateRecipe = require('../validations/recipesValidations');

const createRecipe = async (newRecipe) => {
  console.log('RECIPES SERVICE');

  const validatedRecipe = validateRecipe(newRecipe);
  if (!validatedRecipe) return { message: 'Invalid entries. Try again.' };

  const createdRecipe = await recipesModel.createRecipe(newRecipe);
  return { createdRecipe };
};

module.exports = {
  createRecipe,
};
