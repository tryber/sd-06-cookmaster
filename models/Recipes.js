const connection = require('./connection');

const CREATED = 201;

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

module.exports = {
  recipeRegister,
};
