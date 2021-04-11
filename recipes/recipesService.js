const recipesModel = require('./recipesModel');
// const usersModel = require('../users/usersModel');

const validateRecipe = require('../validations/recipesValidations');

const createRecipe = async (newRecipe) => {
  console.log('RECIPES SERVICE');

  const validatedRecipe = validateRecipe(newRecipe);
  if (!validatedRecipe) return { message: 'Invalid entries. Try again.' };

  const createdRecipe = await recipesModel.createRecipe(newRecipe);
  return { createdRecipe };
};

const findById = async (id) => {
  console.log('FIND BY ID SERVICE');

  if (id.length < 24) return { message: 'recipe not found' };

  const recipeById = await recipesModel.findById(id);
  console.log('Na funcao', recipeById);
  if (recipeById === null) return { message: 'recipe not found' };
  console.log('Na funcao', recipeById);

  return { recipeById };
};

const updateRecipe = async (editedRecipe, _userId) => {
  console.log('UPDATE RECIPE SERVICE');

  // const idConsulta = editedRecipe.recipeId;
  // const { recipeById } = await findById(idConsulta);
  // console.log('UNDEFINED', recipeById);
  // const userById = await usersModel.findById(userId);

  // if (recipeById.userId !== userId || userById.role !== 'admin') {
  //   return { naoAutorizado: 401, message: 'Usuário não autorizado' };
  // }

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
