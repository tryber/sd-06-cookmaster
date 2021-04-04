const connection = require('./connection');

const insertRecipe = (recipe) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .insertOne(recipe));

const getAllRecipes = () =>
  connection()
    .then((db) => db
      .collection('recipes')
      .find().toArray());

module.exports = {
  insertRecipe,
  getAllRecipes,
};