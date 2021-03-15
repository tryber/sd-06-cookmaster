const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const recipesList = await connection('recipes').then((db) => db.find().toArray());
  return recipesList;
};

const getRecipeById = async (id) => {
  const foundRecipe = await connection('recipes').then((db) => db.findOne(ObjectId(id)));
  return foundRecipe;
};

const insertNewRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await connection('recipes')
    .then((db) => db.insertOne({ name, ingredients, preparation, userId }));

  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipe.insertedId,
  };
};

module.exports = {
  insertNewRecipe,
  getAllRecipes,
  getRecipeById,
};
