const connection = require('./connection');

const createRecipe = async (recipe) => {
  const { name, ingredients, preparation } = recipe;

  const { ops: queryResult } = await connection().then((db) => db
  .collection('recipes')
  .insertOne({ name, ingredients, preparation }));
  const createdRecipe = { recipe: queryResult[0] };

  return createdRecipe;
};

module.exports = {
  createRecipe,
};