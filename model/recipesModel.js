const { ObjectId } = require('bson');
const db = require('./connection');

const connection = db.getCollection('recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const collection = await connection;
  const result = await collection.insertOne({ name, ingredients, preparation, userId });

  return { _id: result.insertedId, name, ingredients, preparation, userId };
};

const getAllRecipes = async () => {
  const collection = await connection;
  const result = await collection.find();

  return result.toArray();
};

const getRecipeById = async (id) => {
  const collection = await connection;

  if (!ObjectId.isValid(id)) return null;

  const result = await collection.findOne({ _id: ObjectId(id) });

  return result;
};

const getRecipeByUserId = async (userId) => {
  const collection = await connection;
  const result = await collection.findOne({ userId });

  return result;
};

const updateRecipeById = async (id, { name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) return null;

  const collection = await connection;
  await collection.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );

  const recipe = await getRecipeById(id);
  return recipe;
};

const deleteRecipe = async (id) => {
  const collection = await connection;
  await collection.deleteOne({ _id: ObjectId(id) });
};

const updateImageById = async (id, image) => {
  if (!ObjectId.isValid(id)) return null;

  const collection = await connection;
  await collection.updateOne(
    { _id: ObjectId(id) },
    { $set: { image } },
  );

  const recipe = await getRecipeById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipeByUserId,
  updateRecipeById,
  deleteRecipe,
  updateImageById,
};
