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

async function update(recipeData) {
  const { recipeId, name, ingredients, preparation } = recipeData;
  const db = await connection();
  const queryResult = await db
    .collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(recipeId) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );

    if (!queryResult.value) return null;
    return queryResult.value;
}

async function remove(id) {
  const db = await connection();
  const queryResult = await db
    .collection('recipes')
    .findOneAndDelete(
      { _id: ObjectId(id) },
    );
  
  if (!queryResult.value) return null;
  console.log('Deletado:', queryResult.value);
  return queryResult.value;
}

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};
