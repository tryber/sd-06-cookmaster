const { ObjectId } = require('mongodb');
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

const getRecipeById = async (id) => {
  const recipe = await connection().then((db) =>
    db.collection(collection).findOne(ObjectId(id)));

  return recipe;
};

const updateRecipe = async (id, recipe) => {
  const { name, ingredients, preparation } = recipe;

  const updatedRecipe = await connection().then((db) =>
    db.collection(collection).updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    ));

  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  await connection().then((db) =>
    db.collection(collection).deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
