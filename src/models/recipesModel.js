const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => { 
  const allRecipes = await connection().then((db) => db.collection('recipes').find().toArray());

  return allRecipes;
};

const create = async (name, ingredients, preparation) => {
  const createNewRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

  return createNewRecipe;
};

const findById = async (id) => {
  const findRecipeById = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));

  return findRecipeById;
};

const update = async (id, user) => {
  const updateRecipe = await connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { user } },
  ));

  return updateRecipe;
};

const remove = async (id) => {
  const removeRecipes = await connection().then((db) => db.collection('recipes').deleteOne(
    { _id: ObjectId(id) },
  ));

  return removeRecipes;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
};