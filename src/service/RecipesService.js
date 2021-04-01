const { ObjectId } = require('mongodb');
const RecipesModel = require('../models/Recipes');
const Validation = require('./validations');

const getAllRecipes = async () => {
  const result = await RecipesModel.getAllRecipes();
  return result;
};

const getRecipeById = async (id) => {
  const result = await Validation.recipeIdValidation(id);
  if (result.payload) return result;
  return result;
};

const editRecipeById = async (reqBody, id, token) => {
  const { name, ingredients, preparation } = reqBody;
  const idValidation = await Validation.recipeIdValidation(id);
  const tokenValidation = await Validation.tokenValidation(token);
  const recipeValidation = Validation.recipesValidation(name, ingredients, preparation);

  if (idValidation.payload) return idValidation;
  if (recipeValidation.payload) return recipeValidation;
  if (tokenValidation.payload) return tokenValidation;
  
  const { _id: userId } = tokenValidation;
  
  const result = await RecipesModel.editRecipeById(reqBody, userId, ObjectId(id));

  return result;
};

const deleteRecipe = async (id, token) => {
  const tokenValidation = await Validation.tokenValidation(token);

  if (tokenValidation.payload) return tokenValidation;

  const result = await RecipesModel.deleteRecipe(ObjectId(id));

  return result;
};

const createRecipe = async (name, ingredients, preparation, token) => {
  const recipeValidation = Validation.recipesValidation(name, ingredients, preparation);
  const tokenValidation = await Validation.tokenValidation(token);
  if (recipeValidation && recipeValidation.payload) return recipeValidation;
  if (tokenValidation.payload) return tokenValidation;
  
  const { _id: userId } = tokenValidation;
  const result = await RecipesModel.createRecipe(name, ingredients, preparation, userId);

  return result;
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  editRecipeById,
  deleteRecipe,
};
