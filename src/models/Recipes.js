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

module.exports = {
  createNewRecipe,
  getAllRecipes,
};
