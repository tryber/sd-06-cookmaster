const connection = require('./connection');

const fundAllRecipes = async () => connection()
  .then((db) => db.connection('recipes').find().toArry());

const createRecipes = async (data) => connection()
  .then((db) => db.connection('recipes').insertOne(data));

module.exports = {
  fundAllRecipes,
  createRecipes,
};
