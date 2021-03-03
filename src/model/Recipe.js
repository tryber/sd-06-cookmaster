// const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

// Find All Users
const getAll = async () => {
  const users = await connection().then((db) => db.collection('recipes').find().toArray());
  return users;
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
  create,
};
