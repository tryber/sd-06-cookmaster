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

module.exports = {
  createRecipe,
  getAllRecipes,
};