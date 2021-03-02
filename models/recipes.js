const connection = require('./connection');

const create = async (name, ingredients, preparation) => {
  const recipeCreated = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

  const recipe = {
    name,
    ingredients,
    preparation,
    _id: recipeCreated.insertedId,
  };

  return { recipe };
};

module.exports = {
  create,
};
