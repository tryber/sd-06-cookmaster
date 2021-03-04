const connection = require('./connection');

const recipeCreate = async (name, ingredients, preparation, userId) => {
  const recipeCreated = await connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((result) => ({ recipe:
    { name, ingredients, preparation, userId, _id: result.insertedId } }));
  return recipeCreated;
};

const getAllRecipes = async () => {
  const allRecipes = await connection()
  .then((db) => db.collection('recipes').find().toArray());
  return allRecipes;
};

module.exports = {
  recipeCreate,
  getAllRecipes,
};
