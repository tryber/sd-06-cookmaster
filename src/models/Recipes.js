// const { ObjectId } = require('mongodb');
const connection = require('../database');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipeCreated = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  const recipe = {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipeCreated.insertedId,
  };

  return { recipe };
};

const findAllRecipes = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('recipes').find().toArray());

  return allProducts;
};

module.exports = {
  createRecipe,
  findAllRecipes,
};