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

const getRecipeById = async (id) => {
  const recipeId = await connection().then((db) => db.collection('recipes').findOne({
    _id: ObjectId(id),
  }));
  return recipeId;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
};
