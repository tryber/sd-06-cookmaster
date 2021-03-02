const connection = require('./connection');

const getAllRecipes = async () => {
  const recipes = await connection().then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const createRecipe = async (name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return ({ name, ingredients, preparation, _id: insertedId });
};

module.exports = {
  getAllRecipes,
  createRecipe,
};