const Recipes = require('../models/Recipes');

const SUCESS = 200;

const getAllRecipes = async () => {
  const recipesResponse = await Recipes.getAllRecipes();

  return {
    status: SUCESS,
    recipesResponse,
  };
};

module.exports = getAllRecipes;