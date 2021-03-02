const connection = require('./connection');

const fundAllRecipes = async () => connection()
  .then((db) => db.connection('recipes').find().toArry());

module.exports = { fundAllRecipes };