const RecipeModel = require('../models/recipe');

const findRecipe = async (idR) => {
  const allRecipes = await RecipeModel.getAllRecipes();
  const result = allRecipes.find((recipe) => {
    const { _id } = recipe;
    const id = JSON.stringify(_id).slice(1, -1);
    return id === idR;
  });
  return result;
};

module.exports = {
  findRecipe,
};
