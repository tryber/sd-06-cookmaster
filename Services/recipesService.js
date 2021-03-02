const { ObjectId } = require('mongodb');
const { 
  createRecipes,
  findAllRecipes,
  findOneRecipes,
  editRecipes,
  deleteRecipes,
} = require('../Model/recipeModel');

const createNewRecipe = async (data) => createRecipes(data);
const getAllRecipes = async () => findAllRecipes();
const getRecipesById = async (id) => findOneRecipes(id);
const putRecipe = async (id, name, ingr, prep) => editRecipes(id, name, ingr, prep);
const delRecipe = async (id) => deleteRecipes(id);

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipesById,
  putRecipe,
  delRecipe,
};
