const conn = require('../utils/connection');

const insertRecipe = async (recipe) => {
  const { insertedId } = await conn().then((db) => db.collection('recipes').insertOne(recipe));
  return insertedId;
};

const getAll = async () => conn()
  .then((db) => db.collection('recipes').find().toArray());

module.exports = {
  insertRecipe,
  getAll,
};