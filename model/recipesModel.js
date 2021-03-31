const db = require('./connection');

const connection = db.getCollection('recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const collection = await connection;
  const result = await collection.insertOne({ name, ingredients, preparation, userId });

  return { _id: result.insertedId, name, ingredients, preparation, userId };
};

module.exports = {
  createRecipe,
};
