const connection = require('./connection');

const registerNewRecipe = async (name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation }));

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId: 'x',
      _id: insertedId,
    },
  };
};

module.exports = {
  registerNewRecipe,
};
