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

module.exports = { createRecipe, getAllRecipes, getRecipeById };
