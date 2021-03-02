const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'recipes';

const createRecipe = async (newRecipe, userId) => {
  const dataBase = await connection(collection);

  const recipeWithUserId = newRecipe;
  recipeWithUserId.userId = userId;

  const result = await dataBase.insertOne(recipeWithUserId);

  return { _id: result.insertedId, ...recipeWithUserId };
};

const getAllRecipes = async () => {
  const dataBase = await connection(collection);

  return dataBase.find().toArray();
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const dataBase = await connection(collection);

  return dataBase.findOne({ _id: ObjectId(id) });
};

const updateRecipe = async (id, recipe) => {
  if (!ObjectId.isValid(id)) return null;

  const dataBase = await connection(collection);

  const result = await dataBase.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: recipe },
    { returnOriginal: false },
);
  return result.value;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const dataBase = await connection(collection);
  return dataBase.deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
