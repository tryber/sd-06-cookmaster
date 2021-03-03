const connection = require('./connection');

// req 4
const getAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

// req 3
const createRecipe = (data) => connection()
  .then((db) => db.collection('recipes').insertOne(data));

module.exports = { 
  createRecipe,
  getAllRecipes,
};
