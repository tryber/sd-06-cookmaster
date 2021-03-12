const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => { 
  const allRecipes = await connection().then((db) => db.collection('recipes').find().toArray());

  return allRecipes;
};

const create = async (name, ingredients, preparation, userId) => {
  const createNewRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  return createNewRecipe;
};

const findById = async (id) => {
  const findRecipeById = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));

  return findRecipeById;
};

const update = async (id, name, ingredients, preparation) => {
  const updateRecipe = await connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  ));

  return updateRecipe;
};

const remove = async (id) => {
  const removeRecipes = await connection().then((db) => db.collection('recipes').deleteOne(
    { _id: ObjectId(id) },
  ));

  return removeRecipes;
};

const updateRecipeWithImage = async (id, image) => {
  const updateWithImage = await connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { image } },
  ));

  return updateWithImage;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
  updateRecipeWithImage,
};