const connection = require('./connection');

const coll = 'recipes';

const createNewRecipe = async (recipeName, ingredients, preparation, userId) => {
  const { ops } = await connection().then((db) => db.collection(coll).insertOne({
    name: recipeName,
    ingredients,
    preparation,
    userId,
  }));

  return ops[0];
};

module.exports = {
  createNewRecipe,
};