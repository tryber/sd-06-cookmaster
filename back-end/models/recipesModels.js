const connection = require('./connection');

const collection = 'recipes';

// const baseStructure = {
//   name: 'Receita do Jacquin',
//   ingredients: 'Frango',
//   preparation: '10 minutos no forno',
// };
// const baseResponse = {
//   _id: ObjectId('5f46919477df66035f61a356'),
//   name: 'string',
//   ingredients: 'string',
//   preparation: 'string',
//   userId: ObjectId('5f46914677df66035f61a355'),
// };

const registerRecipe = async () => {
  const responsePayload = await 'Register Recipe';
  return responsePayload;
};

const getAllRecipes = async () => {
  const responsePayload = await 'Get All Recipes';
  return responsePayload;
};

const getRecipesById = async () => {
  const responsePayload = await 'Get recipe by ID';
  return responsePayload;
};

const deleteRecipeById = async () => {
  const responsePayload = await 'Delete recipe by id ';
  return responsePayload;
};

const addImageToRecipe = async () => {
  const responsePayload = await 'Add image to recipe';
  return responsePayload; 
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipesById,
  deleteRecipeById,
  addImageToRecipe,
};