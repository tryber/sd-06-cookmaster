const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await getCollection('recipes')
  .then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }));

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: newRecipe.insertedId,
    },
  };
};

const getAllRecipes = async () => {
  const allRecipes = await getCollection('recipes').then((recipes) => recipes.find().toArray());
  return allRecipes;
};

const getRecipeById = async (id) => {
  const recipe = await getCollection('recipes').then((recipes) => recipes.findOne(ObjectId(id)));
  return recipe;
};

const editRecipeById = async (id, payload, userId) => {
  const { name, ingredients, preparation } = payload;

  await getCollection('recipes').then((recipes) => recipes.updateOne(
    { _id: ObjectId(id) },
    { $set: {
      name,
      ingredients,
      preparation,
    } },
  ));

  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
};