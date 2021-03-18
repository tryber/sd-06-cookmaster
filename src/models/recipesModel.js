const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function createRecipes(name, ingredients, preparation, userId) {
  const result = await connection().then((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }));
  const { insertedId } = result;
  console.log({
    recipe: {
      name, ingredients, preparation, userId, _id: insertedId,
    },
  });
  return {
    recipe: {
      name, ingredients, preparation, userId, _id: insertedId,
    },
  };
}

async function getAll() {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
}

async function findById(id) {
  const db = await connection();
  const result = await db.collection('recipes').findOne(ObjectId(id));
  return result;
}

async function updateRecipes(recipeData) {
  const { recipeId, name, ingredients, preparation } = recipeData;
  const db = await connection();
  const result = await db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(recipeId) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false });
  if (!result.value) return null;
  return result.value;
}

async function insertRecipeImage(recipeId, imageUrl) {
  const db = await connection();
  const result = await db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(recipeId) },
      { $set: { image: imageUrl } },
      { returnOriginal: false });
  if (!result.value) return null;
  return result.value;
}

async function removeRecipe(id) {
  const db = await connection();
  const result = await db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) });

  if (!result.value) return null;
  return result.value;
}

module.exports = {
  createRecipes,
  getAll,
  findById,
  updateRecipes,
  removeRecipe,
  insertRecipeImage,
};
