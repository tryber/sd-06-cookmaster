const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const getRecipes = await connection().then((db) => db.collection('recipes').find().toArray());

  return getRecipes;
};

const findRecipesById = async (id) => {
  const recipeDetail = await connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)));

  return recipeDetail;
};

const createRecipes = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  return { name, ingredients, preparation, userId, _id: insertedId };
};

const updateRecipes = async (id, name, ingredients, preparation) => {
  const updateRecipe = await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

  return updateRecipe;
};

const deleteRecipes = async (id) => {
  await connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

const updateImages = async (id, image) => {
  const updateImage = await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image } }));

  return updateImage;
};

module.exports = {
  getAllRecipes,
  findRecipesById,
  createRecipes,
  updateRecipes,
  deleteRecipes,
  updateImages,
};
