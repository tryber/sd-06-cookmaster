const { ObjectId } = require('mongodb');
const conn = require('./connection');

const getAllRecipes = async () => {
  const db = await conn();
  return db.collection('recipes').find({}).toArray();
};

const getRecipeById = async (id) => {
  const db = await conn();
  return db.collection('recipes').findOne(ObjectId(id));
};

const getRecipeByName = async (q) => {
  const db = await conn();
  return db.collection('recipes').findOne({ name: new RegExp(`/${q}/`) });
};

const addRecipe = async (id, name, ingredients, preparation) => {
  const db = await conn();
  return (
    await db
      .collection('recipes')
      .insertOne({ id, name, ingredients, preparation })
  ).ops[0];
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const db = await conn();
  await db
    .collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    );
  return getRecipeById(id);
};

const addImageToRecipe = async (id) => {
  const db = await conn();
  return db
    .collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { image: `localhost:3000/images/${id}.jpeg` } },
    );
};

const deleteRecipeById = async (id) => {
  const db = await conn();
  return db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipeByName,
  addRecipe,
  updateRecipe,
  addImageToRecipe,
  deleteRecipeById,
};
