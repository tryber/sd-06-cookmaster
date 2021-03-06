const { ObjectId } = require('mongodb');
const connection = require('./connection');

// falta url da imagem
const createRecipe = async (recipeInfo, userId) => {
  const { name, ingredients, preparation } = recipeInfo;
  const db = await connection();
  const { insertedId } = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  });
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

const getAll = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const getRecipeById = async (id) => {
  const db = await connection();
  return db.collection('recipes').findOne({ _id: ObjectId(id) });
};

const editRecipeById = async (id, recipeInfo, userId) => {
  const { name, ingredients, preparation } = recipeInfo;
  const db = await connection();
  const { insertedId } = await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );
  return {
    _id: insertedId,
    name,
    ingredients,
    preparation,
    userId,
  };
};

module.exports = {
  createRecipe,
  getAll,
  getRecipeById,
  editRecipeById,
};