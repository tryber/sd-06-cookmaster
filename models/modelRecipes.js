const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const getAllRecipes = async () => getCollection('recipes')
  .then((recipe) => recipe.find().toArray());

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('recipes').then((recipe) => recipe.findOne(ObjectId(id)));
};

const createRecipe = async ({ name, ingredients, preparation }, userId) => {
  const { insertedId } = await getCollection('recipes').then((recipe) =>
    recipe.insertOne({ name, ingredients, preparation, userId }));

  return { recipe: { name, ingredients, preparation, userId, _id: insertedId } };
};

const updateRecipe = async ({ id, name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) return null;
  const Recipe = await getCollection('recipes').then((recipe) =>
    recipe.updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

  return Recipe;
};

const excludeRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('recipes').then((recipe) => recipe.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  excludeRecipe,
};