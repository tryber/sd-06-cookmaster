const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const recipeCreated = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  const recipe = {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipeCreated.insertedId,
  };

  return { recipe };
};

module.exports = {
  create,
};
