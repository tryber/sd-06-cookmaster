const connection = require('./connection');

const createRecipes = async (recipes) => {
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne(recipes));
  return result;
};
const listRecipes = async () => {
  const result = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return result;
};

module.exports = {
  createRecipes,
  listRecipes,
};
