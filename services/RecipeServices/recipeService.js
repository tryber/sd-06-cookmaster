const Recipes = require('../../models/recipeModel');

const createOne = async (recipe) => {
  const recipeData = await Recipes.createOne(recipe);
  return recipeData;
};

const findOneById = async (id) => {
  const recipeData = await Recipes.findOne(id);
  return recipeData;
};

const findAll = async () => Recipes.findAll();

const updateOne = async (id, recipe) => Recipes.updateOne(id, recipe);

const addField = async (id, field) => Recipes.addField(id, field);

const deleteOne = async (id) => Recipes.deleteOne(id);

module.exports = {
  createOne, findOneById, findAll, updateOne, deleteOne, addField,
}; 
