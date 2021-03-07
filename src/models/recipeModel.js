const connection = require('../database/connection');

const collection = 'recipes';

const createRecipe = async (recipe) => {
  const createdRecipe = await connection().then((db) =>
    db.collection(collection).insertOne(recipe));

  return createdRecipe.ops[0];
};

const getAllRecipes = async () => {
  const allRecipes = await connection().then((db) =>
    db.collection(collection).find().toArray());

  return allRecipes;
};

module.exports = { createRecipe, getAllRecipes };
