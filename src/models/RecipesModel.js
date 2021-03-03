const conn = require('../utils/connection');

const insertRecipe = async (recipe) => {
  const { insertedId } = await conn().then((db) => db.collection('recipes').insertOne(recipe));
  return insertedId;
};

module.exports = {
  insertRecipe,
};