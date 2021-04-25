const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => connection()
    .then((database) => database.collection('recipes').find().toArray());

const createRecipe = async (userId, name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ userId, name, ingredients, preparation }));
    return {
    recipeId: insertedId,
  };
};

const getRecipeById = async (id) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(id));
  return recipe;
};

const updateRecipe = async (...params) => {
  const [recipeId, name, ingredients, preparation] = params;
  await connection()
  .then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(recipeId) },
    { $set: { name, ingredients, preparation } },
  ));
};

const removeRecipe = async (id) => {
  await connection().then((db) => db.collection('recipes').deleteOne(
    { _id: ObjectId(id) },
  ));
};

const insertRecipeImage = async (id, imagePath) => connection()
  .then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { image: imagePath } },
  ));

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  removeRecipe,
  insertRecipeImage,
};
