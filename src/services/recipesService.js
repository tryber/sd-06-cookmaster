const RecipesModel = require('../models/recipesModel');

const getAll = async () => {
  const getAllRecipes = await RecipesModel.getAll();

  return getAllRecipes;
};

const findById = async (id) => {
  const findRecipeById = await RecipesModel.findById(id);

  return findRecipeById;
};

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await RecipesModel.create(name, ingredients, preparation, userId);

  return newRecipe;
};

const update = async (id, name, ingredients, preparation) => {
  const updateRecipe = await RecipesModel.update(id, name, ingredients, preparation);

  return updateRecipe;
};

const remove = async (id) => {
  const removeRecipe = await RecipesModel.remove(id);

  return removeRecipe;
};

const updateRecipeWithImage = async (id, image) => {
  const updateWithImage = await RecipesModel.updateRecipeWithImage(id, image);
  
  return updateWithImage;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
  updateRecipeWithImage,
};