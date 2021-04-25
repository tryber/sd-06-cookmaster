const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionName = 'recipes';

const createRecipes = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection(collectionName).insertOne({
      name, ingredients, preparation, userId,
    }));
  return insertedId;
};

const getAllRecipes = async () => {
  const recipesResponse = await connection()
    .then((db) => db.collection(collectionName).find().toArray());
  return recipesResponse;
};

const getRecipesById = async (id) => {
  const recipes = await connection()
  .then((db) => db.collection(collectionName).findOne(ObjectId(id)));
  return recipes;
};

const updateRecipesById = async (id, name, ingredients, preparation) => {
  const recipes = await connection()
  .then((db) => db.collection(collectionName).findOne(ObjectId(id)));

  await connection()
  .then((db) => db.collection(collectionName).updateOne(
    {
    _id: ObjectId(id),
    },
    {
      $set: { name, ingredients, preparation },
    },
  ));
  return recipes;
};

const deleteRecipesById = async (id) => {
  await connection()
    .then((db) => db.collection(collectionName).deleteOne({
      _id: ObjectId(id),
    }));
};

const updateRecipesWithImage = async (id) => {
  const pathimage = `localhost:3000/images/${id}.jpeg`;
  await connection()
  .then((db) => db.collection(collectionName).updateOne(
    {
    _id: ObjectId(id),
    },
    {
      $set: { image: pathimage },
    },
  ));

  const recipes = await connection()
  .then((db) => db.collection(collectionName).findOne(ObjectId(id)));

  return recipes;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
  updateRecipesWithImage,
};
