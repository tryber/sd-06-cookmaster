const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

// Find All Recipes
const getAll = async () => {
  const recipes = await connection().then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

// Find by Id Recipe
const findById = async (id) => {
  const recipe = connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .catch((error) => console.error(error));
  return recipe;
};

// Add New Recipe
const create = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .catch((err) => console.error(err));
  return { recipe: { _id: insertedId, name, ingredients, preparation, userId } };
};

module.exports = {
  getAll,
  findById,
  create,
};
