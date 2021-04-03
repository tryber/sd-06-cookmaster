const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipe) => {
  const { name, ingredients, preparation } = recipe;

  const { ops: queryResult } = await connection().then((db) => db
  .collection('recipes')
  .insertOne({ name, ingredients, preparation }));
  const createdRecipe = { recipe: queryResult[0] };

  return createdRecipe;
};

const findAll = async () => {
  const recipes = await connection().then((db) => db
  .collection('recipes')
  .find()
  .toArray());

  return recipes;
};

const findById = async (id) => {
  const recipe = await connection().then((db) => db
  .collection('recipes')
  .findOne({ _id: ObjectId(id) }));

  return recipe;
};

const updateRecipe = async (recipe) => {
  const { id, name, ingredients, preparation } = recipe;

  return connection().then((db) => db
    .collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    ));
};

const addImageToRecipe = async (recipe) => {
  const { _id: id, name, ingredients, preparation, userId, image } = recipe;

  return connection().then((db) => db
    .collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId, image } },
      { upsert: true },
    ));
};

const removeRecipe = async (id) => connection().then((db) => db
  .collection('recipes')
  .deleteOne(
    { _id: ObjectId(id) },
  ));

module.exports = {
  addImageToRecipe,
  createRecipe,
  findAll,
  findById,
  removeRecipe,
  updateRecipe,
};
