// const { ObjectId } = require('mongodb');
const { ObjectId } = require('mongodb');
const Recipes = require('./RecipesSchema');

const createRecipeDb = async (name, ingredients, preparation) => {
  const newRecipe = await Recipes.create({ name, ingredients, preparation });

  return newRecipe;
};

const searchAllRecipesDb = async () => {
  const allRecipes = await Recipes.find();

  return allRecipes;
};

const SearchRecipeByIdDb = async (id) => {
  const recipeById = await Recipes.findOne({ _id: ObjectId(id) });

  console.log(recipeById);

  return recipeById;
};

module.exports = {
  createRecipeDb,
  searchAllRecipesDb,
  SearchRecipeByIdDb,
};
