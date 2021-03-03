const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => connect().then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => connect().then((db) => db.collection('recipes')
  .findOne(ObjectId(id)));

const postRecipe = async ({ name, ingredients, preparation }, userId) => {
  const { insertedId } = await connect().then((db) => db.collection('recipes').insertOne(
    { name, ingredients, preparation, userId },
  ));
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
  },
  };
};

module.exports = {
  getAll,
  getById,
  postRecipe,
};
