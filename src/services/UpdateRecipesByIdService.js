const Recipes = require('../models/Recipes');

const SUCESS = 200;

const updateRecipesByIdService = async (id, name, ingredients, preparation) => {
  const recipes = await Recipes.updateRecipesById(id, name, ingredients, preparation);
  const { userId } = recipes;

  return {
    status: SUCESS,
    recipesResponse: { _id: id, name, ingredients, preparation, userId },
  };
};

module.exports = updateRecipesByIdService;
