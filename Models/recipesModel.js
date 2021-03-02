const connection = require('./connection');

const getAll = async () => {
  const getAllRecipes = await connection().then((db) => db.collection('recipes').find().toArray());
  return getAllRecipes;
};

const create = async (name, ingredients, preparation) => {
  const creation = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return creation;
};

module.exports = {
  getAll,
  create,
};