const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const register = async (name, ingredients, preparation, userId) => {
  const registerRecipe = await getConnection('recipes')
    .then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }));
  return { recipe: { _id: registerRecipe.insertedId, name, ingredients, preparation, userId } };
};

const getAllRecipes = async () => getConnection('recipes')
  .then((recipes) => recipes.find().toArray());

const getRecipeById = async (id) => getConnection('recipes')
  .then((recipes) => recipes.findOne(ObjectId(id)));

module.exports = {
  register,
  getAllRecipes,
  getRecipeById,
};
