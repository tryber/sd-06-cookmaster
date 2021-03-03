const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return allRecipes;
};

const getById = async (id) => {
  const recipeId = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
    console.log(recipeId);
  return recipeId;
};

const create = async (name, ingredients, preparation) => {
  const createdRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return createdRecipe;
};

const update = async (name, ingredients, preparation, id) => {
  await connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
));
  return {
    _id: id,
    name,
    ingredients,
    preparation,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};