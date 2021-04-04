const recipesModel = require('./recipesModel');
const usersModel = require('../users/usersModel');

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

const updateRecipe = async (editedRecipe) => {
  console.log('UPDATE RECIPE SERVICE');

  const { _id: id } = await usersModel.findByEmail('erickjacquin@gmail.com');
  // console.log('USER recipe service', user);
  console.log('ID DO FIND BY EMAIL', id);
  const oldRecipe = await recipesModel.findById(editedRecipe.recipeId);
  console.log('OLD RECIPEE service', oldRecipe);
  console.log('ID DO USUARIO DA RECEITA');

  console.log(editedRecipe);
  const validatedRecipe = validateRecipe(editedRecipe);
  if (!validatedRecipe) return { message: 'Invalid entries. Try again.' };

  const recipe = await recipesModel.updateRecipe(editedRecipe);

  return { recipe };
};

module.exports = {
  createRecipe,
  findById,
  updateRecipe,
};
