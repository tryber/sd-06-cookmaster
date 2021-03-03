const { ObjectID } = require('mongodb');
const connection = require('./connections');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
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

const getAllRecipes = async () => {
  const recipes = await connection().then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await connection().then((db) => db.collection('recipes').findOne(ObjectID(id)));
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};