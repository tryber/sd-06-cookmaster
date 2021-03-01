// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection()
    .then((db) => db.collection('users').insertOne({ name, ingredients, preparation, userId }));
  return result.ops[0];
};

module.exports = {
  createRecipe,
};
