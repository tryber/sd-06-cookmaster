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

  return recipeById;
};

const UpdateRecipeByIdDb = async (id, body) => {
  const { name, ingredients, preparation } = body;

  await Recipes.updateOne(
    { _id: ObjectId(id) }, 
    { $set: { name, ingredients, preparation } },
  );

  const updateRecipe = await SearchRecipeByIdDb(id);

  return updateRecipe;
};

const DeleteRecipeByIdDb = async (id) => {
  const recipeById = await Recipes.deleteOne({ _id: ObjectId(id) });

  return recipeById;
};

module.exports = {
  createRecipeDb,
  searchAllRecipesDb,
  SearchRecipeByIdDb,
  UpdateRecipeByIdDb,
  DeleteRecipeByIdDb,
};
