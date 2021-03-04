// const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function create(name, ingredients, preparation, userId) {
  const db = await connection();
  const { insertedId } = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
  };
}

module.exports = {
  create,
};
