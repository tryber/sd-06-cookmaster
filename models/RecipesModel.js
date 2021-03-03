const connection = require('./connection');

const getAll = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return allRecipes;
};

const create = async (name, ingredients, preparation) => {
  const createdRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return createdRecipe;
};

module.exports = {
  create,
  getAll,
};