const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const getRecipes = await connection()
  .then((db) => db.collection('recipes').find().toArray());
  return getRecipes;
};

const createRecipe = async (name, ingredients, preparation, userID) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userID }));
  return ({
      _id: insertedId,
      name,
      ingredients,
      preparation,
      userID,
  });
};

const getById = async (id) => {
  const recipeId = await connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipeId;
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getById,
};
