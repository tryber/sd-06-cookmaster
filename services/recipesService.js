const { getAllRecipes, createRecipe,
  getById, update, deleteRecipe } = require('../models/recipesModel');

const getAllService = async () => {
  const recipes = await getAllRecipes();
  return recipes;
};

const createService = async (name, ingredients, preparation, userID) => {
  const newRecipe = await createRecipe(name, ingredients, preparation, userID);
  return newRecipe;
};

const getIdService = async (id) => {
  const recipeId = await getById(id);
  return recipeId;
};

const editService = async (id, name, ingredients, preparation) => {
  await update(id, name, ingredients, preparation);
  return { name, ingredients, preparation };
};

const deleteService = async (id) => {
  await deleteRecipe(id);
};

module.exports = {
  getAllService,
  createService,
  getIdService,
  editService,
  deleteService,
};
