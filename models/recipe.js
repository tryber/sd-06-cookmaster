const { ObjectId } = require('mongodb');
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

const getRecipeById = async (recId) => {
  const recipeId = await connection().then((db) => db.collection('recipes').findOne({
    _id: ObjectId(recId),
  }));
  if (recipeId) {
    return recipeId;
  }
  return null;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  await connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  ));
};

const deleteRecipe = async (id) => {
  await connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};
