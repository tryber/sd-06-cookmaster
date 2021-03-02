const RecipesModel = require('../models/RecipesModel');

const getAllRecipesService = async () => {
  const allRecipes = await RecipesModel.getAllRecipes();
  return allRecipes;
};

const createRecipeService = async (name, ingredients, preparation, userId) => {
  const { _id } = await RecipesModel.createRecipe(name, ingredients, preparation, userId);
  return ({
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id,
    },
  });
};

module.exports = {
  getAllRecipesService,
  createRecipeService,
};
