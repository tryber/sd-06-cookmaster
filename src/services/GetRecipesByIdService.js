const Recipes = require('../models/Recipes');

const SUCESS = 200;

const getRecipesByIdService = async (id) => {
  const recipesResponse = await Recipes.getRecipesById(id);

  return {
    status: SUCESS,
    recipesResponse,
  };
};

module.exports = getRecipesByIdService;