const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  }));
  return insertedId;
};

const getAllRecipes = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return allRecipes;
};

const getRecipeById = async (recId) => {
  const recipeId = await connection().then((db) => db.collection('recipes').findOne({
    _id: ObjectId(recId),
  }));
  if (recipeId) {
    const { _id: id, name, ingredients, preparation, userId } = recipeId;
    const recipe = { id, name, ingredients, preparation, userId };
    return recipe;
  }
  return null;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
};
