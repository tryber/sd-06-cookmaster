const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'recipes';

const getAll = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .find().toArray());
  
  return allRecipes;
};

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .insertOne({ name, ingredients, preparation, userId }));

  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipe.insertedId,
  };
};

const findById = async (id) => {
  const recipe = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .findOne(ObjectId(id)));
  
  return recipe;
};

const update = async (id, name, ingredients, preparation) => {
  const recipeUpdated = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
      ));

  return recipeUpdated.value;
};

const addImage = async (id, image) => {
  const recipeUpdated = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { image } },
        { returnOriginal: false },
      ));

  return recipeUpdated.value;
};

const remove = async (id) => {
  const recipeDeleted = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .findOneAndDelete({ _id: ObjectId(id) }));

  return recipeDeleted.value;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  addImage,
  remove,
};