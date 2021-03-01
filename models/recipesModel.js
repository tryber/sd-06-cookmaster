const connection = require('./connection');

const createRecipe = (data) =>
  connection().then((db) => db.collection('recipes').insertOne(data));

const allRecipes = () =>
  connection().then((db) => db.collection('recipes').find().toArray());

module.exports = {
  createRecipe,
  allRecipes,
};
