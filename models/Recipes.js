const connection = require('./connection');

const createRecipes = async (obj) => {
  const answer = await connection()
    .then((db) => db.collection('recipes').insertOne(obj));
  return answer;
};

module.exports = {
  createRecipes,
};