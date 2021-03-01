const connection = require('./connection');

const getAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const createRecipe = async (data) => connection()
  .then((db) => db.collection('recipes').insertOne(data));

module.exports = {
  createRecipe,
  getAllRecipes,
};
