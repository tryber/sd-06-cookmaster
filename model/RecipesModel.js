const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (objData) => {
  const loggedUser = {
    ...objData,
    image: 'image path',
  };

  const { insertedId } = await connection().then((db) => db
  .collection('recipes').insertOne(loggedUser));
  return {
    recipe: {
      ...loggedUser,
      _id: insertedId,
    },
  };
};

const getAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => connection().then((db) => db
  .collection('recipes').findOne(ObjectId(id)));

const getUserId = async (userId) => connection().then((db) => db
  .collection('recipes').findOne(userId));

const updateRecipe = async (id, objData) => {
  await connection().then((db) => db
  .collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: objData },
  ));
  return {
      ...objData,
      _id: id,
  };
};

const deleteRecipe = async (id) => {
  const remove = await connection().then((db) => db
  .collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return remove;
};

const addImage = async (id, path) => {
  const { insertedId } = await connection().then((db) => db
  .collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { image: path } },
  ));
  return {
    recipe: {
      _id: insertedId,
    },
  };
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  getUserId,
  deleteRecipe,
  addImage,
};
