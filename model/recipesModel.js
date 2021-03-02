const connection = require('./connection');

// req 3
const createRecipe = (data) => connection()
  .then((db) => db.collection('recipes').insertOne(data));

module.exports = { createRecipe };
