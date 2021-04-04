const connection = require('../connection');

const createRecipe = async (newRecipe) => {
  console.log('RECIPES MODEL');
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ newRecipe }));
  return {
    recipe: {
      name: newRecipe.name,
      ingredients: newRecipe.ingredients,
      preparation: newRecipe.preparation,
      userId: newRecipe.userId,
      _id: insertedId,
    },
  };
};

module.exports = {
  createRecipe,
};
