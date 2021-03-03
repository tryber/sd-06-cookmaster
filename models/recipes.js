const connection = require('./connection');

const insertRecipe = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

module.exports = {
  insertRecipe,
};
