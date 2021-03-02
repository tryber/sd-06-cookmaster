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

module.exports = {
  createRecipe,
};