const { ObjectId } = require('bson');
const connection = require('./connection');

const coll = 'recipes';

const createNewRecipe = async (recipeName, ingredients, preparation, userId) => {
  const { ops } = await connection().then((db) => db.collection(coll).insertOne({
    name: recipeName,
    ingredients,
    preparation,
    userId,
  }));

  return ops[0];
};

const getAllRecipes = async () => {
  const response = await connection().then((db) => db.collection(coll).find().toArray());

  return response;
};

const getRecipeById = async (recipeId) => (
  connection().then((db) => db.collection(coll).findOne({ _id: ObjectId(recipeId) }))
);

const editRecipe = async (recipeId, name, ingredients, preparation) => (
  connection().then((db) => db.collection(coll).findOneAndUpdate(
    { _id: ObjectId(recipeId) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  ))
);

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
};