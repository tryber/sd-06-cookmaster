const connection = require('./connection');

const createRecipes = async (recipes) => {
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne(recipes));
  return result;
};

module.exports = {
  createRecipes,
};
