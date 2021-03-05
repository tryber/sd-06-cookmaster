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

module.exports = {
  addRecipe,
  getAllRecipes,
};
