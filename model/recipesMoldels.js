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
const updateRecipe = async (id, { name, ingredients, preparation, userId }) => {
  await connection().then((db) => {
    db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } });
  });

  return { id, name, ingredients, preparation, userId };
};
const removeRecipe = async (id) => {
  const remove = await connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return remove;
};
module.exports = {
  createRecipes,
  listRecipes,
  findById,
  updateRecipe,
  removeRecipe,
};
