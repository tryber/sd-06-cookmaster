const Recipes = require('../models/Recipes');

const NOCONTET = 204;

const deleteRecipesByIdService = async (id) => {
  await Recipes.deleteRecipesById(id);

  return {
    status: NOCONTET,
  };
};

module.exports = deleteRecipesByIdService;