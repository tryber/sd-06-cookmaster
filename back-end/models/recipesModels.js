const { ObjectId } = require('mongodb');

const connection = require('./connection');
const { status, errorMessages } = require('../middlewares/errorHandler/dictionaries');
const { ThrowError } = require('../middlewares/errorHandler/errorHandler');

const collection = 'recipes';

// const baseStructure = {
//   name: 'Receita do Jacquin',
//   ingredients: 'Frango',
//   preparation: '10 minutos no forno',
// };
// const baseResponse = {
//   _id: ObjectId('5f46919477df66035f61a356'),
//   name: 'string',
//   ingredients: 'string',
//   preparation: 'string',
//   userId: ObjectId('5f46914677df66035f61a355'),
// };

const registerRecipe = async ({ name, ingredients, preparation }) => {
  const responsePayload = await connection().then((db) => 
    db.collection(collection).insertOne({ name, ingredients, preparation }));
  return responsePayload;
};

const getAllRecipes = async () => {
  const responsePayload = await connection().then((db) => 
    db.collection(collection).find().toArray());
  return responsePayload;
};

const getRecipesById = async (id) => {
  const responsePayload = await connection().then((db) => 
    db.collection(collection).findOne({ _id: ObjectId(id) }))
      .catch((_error) => {
        throw new ThrowError(status.notFound, errorMessages.recipeNotFound);
      });
  return responsePayload;
};

const updateRecipe = async (id, { name, ingredients, preparation }) => {
  const responsePayload = await connection().then((db) => 
    db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
  return responsePayload;
};

const deleteRecipeById = async () => {
  const responsePayload = await 'Delete recipe by id ';
  return responsePayload;
};

const addImageToRecipe = async () => {
  const responsePayload = await 'Add image to recipe';
  return responsePayload; 
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipesById,
  deleteRecipeById,
  addImageToRecipe,
  updateRecipe,
};