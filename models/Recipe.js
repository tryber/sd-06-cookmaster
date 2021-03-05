const { ObjectId } = require('mongodb');
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

async function getAll() {
  const db = await connection();
  const queryResult = await db
    .collection('recipes')
    .find()
    .toArray();

  return queryResult;
}

async function findById(id) {
  const db = await connection();
  const queryResult = await db
    .collection('recipes')
    .findOne(ObjectId(id));
  return queryResult;
}

module.exports = {
  create,
  getAll,
  findById,
};
