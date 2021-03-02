const connection = require('./connection');

const collection = 'recipes';

const createRecipe = async (newRecipe) => {
  const dataBase = await connection(collection);

  const result = await dataBase.insertOne(newRecipe);

  return { _id: result.insertedId, ...newRecipe };
};

module.exports = { createRecipe };
