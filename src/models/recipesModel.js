const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const recipesList = await connection('recipes').then((db) => db.find().toArray());
  return recipesList;
};

const getRecipeById = async (id) => {
  const foundRecipe = await connection('recipes').then((db) => db.findOne(ObjectId(id)));
  return foundRecipe;
};

const insertNewRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await connection('recipes')
    .then((db) => db.insertOne({ name, ingredients, preparation, userId }));

  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipe.insertedId,
  };
};

const updateRecipeModel = async (id, name, ingredients, preparation) => {
  const recipeUpdated = await connection('recipes')
    .then((db) => db.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
      ));

  return recipeUpdated.value;
};

const removeRecipe = async (id) => {
  const recipeDeleted = await connection('recipes')
    .then((db) => db.findOneAndDelete({ _id: ObjectId(id) }));

  return recipeDeleted.value;
};

module.exports = {
  insertNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeModel,
  removeRecipe,
};
