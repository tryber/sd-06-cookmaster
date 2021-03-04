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

const putRecipe = async (id, { name, ingredients, preparation }, userId) => {
  await connect().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } },
  ));
  return {
      _id: ObjectId(id),
      name,
      ingredients,
      preparation,
      userId,
  };
};

const putImage = async (id, { name, ingredients, preparation, userId }, image) => {
  await connect().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { image } },
  ));
  return {
      _id: ObjectId(id),
      name,
      ingredients,
      preparation,
      userId,
      image,
  };
};

const deleteRecipe = async (id) => connect().then((db) => db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  getById,
  putImage,
  putRecipe,
  postRecipe,
  deleteRecipe,
};
