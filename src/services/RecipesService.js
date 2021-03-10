const Service = require('../models/RecipesModel');

const getAllRecipes = async () => {
  const recipes = await Service.getAllRecipes();
  return recipes;
};

// Desafio 3 - Cadastrar Recipe
const createRecipe = async (name, ingredients, preparation, userId) => { 
  const recipe = await Service.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};