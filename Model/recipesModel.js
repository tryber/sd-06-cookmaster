const connection = require('./connection');

const createRecipe = (data) => connection()
  .then((db) => db.collection('recipes').insertOne(data));

module.exports = { createRecipe };
