const connection = require('./connection');

const createRecipes = async (obj) => {
  const answer = await connection()
    .then((db) => db.collection('recipes').insertOne(obj));
  return answer;
};

const listRecipes = async () => {
  const answer = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return answer;
};

module.exports = {
  createRecipes,
  listRecipes,
};