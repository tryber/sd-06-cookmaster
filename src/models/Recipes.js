const { ObjectId } = require('mongodb');
const connection = require('./connection');

const DB_COLECTION = 'recipes';

const createNewRecipe = async (name, ingredients, preparation, _id) => {
  const { insertedId } = await connection().then((db) =>
    db.collection(DB_COLECTION).insertOne({ name, ingredients, preparation, userId: _id }));

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId: _id,
      _id: ObjectId(insertedId),
    },
  };
};

const getAllRecipes = async () =>
  connection().then((db) => db.collection(DB_COLECTION).find().toArray());

const getByIdRecipes = async (id) =>
  connection().then((db) => db.collection(DB_COLECTION).findOne(ObjectId(id)));

const updateRecipes = async (id, name, ingredients, preparation) =>
  connection().then((db) => db.collection(DB_COLECTION).updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
  ));

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getByIdRecipes,
  updateRecipes,
};
