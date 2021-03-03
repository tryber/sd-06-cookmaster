// const { ObjectId } = require('mongodb');
const Recipes = require('./RecipesSchema');

const createRecipeDb = async (name, ingredients, preparation) => {
  const newRecipe = await Recipes.create({ name, ingredients, preparation });

  return newRecipe;
};

const searchAllRecipesDb = async () => {
  const allRecipes = await Recipes.find();

  return allRecipes;
};

module.exports = {
  createRecipeDb,
  searchAllRecipesDb,
};
