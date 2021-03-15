const { ObjectId } = require('bson');
const connection = require('../connection');

const createRecipe = async (recipe) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne(recipe));
  
  return {
    _id: insertedId,
  };
};

const getAllRecipes = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return allRecipes;
};

const getRecipeById = async (id) => {
  const recipe = await connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const updatedRecipe = await connection()
  .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
  // console.log(updatedRecipe);
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const { value } = await connection()
    .then((db) => db.collection('recipes')
    .findOneAndDelete({ _id: ObjectId(id) }));

return value;
};

const updateImage = async (id, image) => connection()
    .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image } }));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateImage,
};
