const RecipesModel = require('../models/RecipesModel');

const getAllRecipes = async () => {
  const allUsers = await RecipesModel.getAllRecipes();
  return allUsers;
};

const createRecipe = async (userId, name, ingredients, preparation) => {
  const { recipeId } = await RecipesModel.createRecipe(userId, name, ingredients, preparation);
  // console.log(recipeId);
  return ({
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: recipeId,
    },
  });
};

module.exports = {
  getAllRecipes,
  createRecipe,
};
