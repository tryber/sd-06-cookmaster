const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => connection()
    .then((database) => database.collection('recipes').find().toArray());

const createRecipe = async (userId, name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ userId, name, ingredients, preparation }));
  // console.log('insertedid', insertedId);
    return {
    recipeId: insertedId,
  };
};

const getRecipeById = async (id) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(id));
  return recipe;
};

const updateRecipe = async (...params) => {
  const [recipeId, name, ingredients, preparation] = params;
  // console.log('Model:', recipeId, name, ingredients, preparation);
  await connection()
  .then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(recipeId) },
    { $set: { name, ingredients, preparation } },
  ));
  // console.log('Id da receita:', recipeId);
  // console.log('Id do usuario:', userId);
  // return {
  //   recipeId,
  // };
  // console.log(recipe);
  // return recipe;
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
};
