const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (recipes) => {
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne(recipes));
  return result;
};
const listRecipes = async () => {
  const result = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return result;
};
const findById = async (id) => {
  const find = await connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)));
  return find;
};
const updateRecipe = async (id, recipe) => {
  const update = await connection().then((db) =>
    db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { recipe } }));
  return update;
};
module.exports = {
  createRecipes,
  listRecipes,
  findById,
  updateRecipe,
};
