const connection = require('./connection');

const create = async (name, ingredients, preparation) => {
  const createdRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return createdRecipe;
};

module.exports = {
  create,
};