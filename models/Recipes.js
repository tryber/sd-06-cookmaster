const { ObjectId } = require('mongodb');
const connection = require('./connection');

const CREATED = 201;
const OK = 200;
const NO_CONTENT = 204;
const NOT_FOUND = 404;
const recipeNotFound = 'recipe not found';

const recipeRegister = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  return [{
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
  }, CREATED];
};

const getRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  
  return [recipes, OK];
};

const getRecipeById = async (id) => {
  const correctIdLength = 24;
  let recipe = false;

  if (id.length === correctIdLength) {
    recipe = await connection()
      .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  }
  
  if (recipe) {
    return [recipe, OK];
  }

  const error = [{ message: recipeNotFound }, NOT_FOUND];
  throw error;
};

const updateRecipeById = async (name, ingredients, preparation, id) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

  return {
    _id: insertedId,
    name,
    ingredients,
    preparation,
    status: OK,
  };
};

const getRecipeOwnerId = async (id) => {
  try {
    const { userId } = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
    
    return userId;
  } catch (_err) {
    const error = [{ message: recipeNotFound }, NOT_FOUND];
    throw error;
  }
};

const deleteRecipe = async (id) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

    if (recipe) {
      await connection()
      .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
    return NO_CONTENT;
  }
  const error = [{ message: recipeNotFound }, NOT_FOUND];
  throw error;
};

const addImage = async (id, recipeImage) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  if (recipe) {
    await connection()
      .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image: recipeImage } }));
    const { _id, name, ingredients, preparation, userId } = recipe;

    return [{ _id, name, ingredients, preparation, userId, image: recipeImage }, OK];
  }
  const error = [{ message: recipeNotFound }, NOT_FOUND];
  throw error;
};

module.exports = {
  recipeRegister,
  getRecipes,
  getRecipeById,
  updateRecipeById,
  getRecipeOwnerId,
  deleteRecipe,
  addImage,
};
