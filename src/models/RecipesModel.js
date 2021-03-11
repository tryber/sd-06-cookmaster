const { ObjectId } = require('mongodb');
const connection = require('../database');

const createRecipeDb = async (name, ingredients, preparation) => {
  const newRecipe = connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation }));

  return newRecipe;
};

const searchAllRecipesDb = async () => {
  const allRecipes = connection().then((db) =>
    db.collection('recipes').find().toArray());

  return allRecipes;
};

const SearchRecipeByIdDb = async (id) => {
  const recipeById = connection().then((db) =>
    db.collection('recipes').findOne({ _id: ObjectId(id) }));

  return recipeById;
};

const SearchRecipeByNameDb = async (name) => {
  const recipeById = connection().then((db) =>
    db.collection('recipes').findOne({ name }));

  return recipeById;
};

const UpdateRecipeByIdDb = async (id, body) => {
  const { name, ingredients, preparation } = body;

  connection().then((db) =>
    db.collection('recipes').updateOne(
      { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
  ));

  const updateRecipe = await SearchRecipeByIdDb(id);

  return updateRecipe;
};

const DeleteRecipeByIdDb = async (id) => {
  const recipeById = connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

  return recipeById;
};

module.exports = {
  createRecipeDb,
  searchAllRecipesDb,
  SearchRecipeByIdDb,
  UpdateRecipeByIdDb,
  DeleteRecipeByIdDb,
  SearchRecipeByNameDb,
};
