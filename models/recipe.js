const connection = require('./connection');

const addRecipe = async (name, ingredients, preparation) => {
  const { insertedId } = await connection().then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
  }));
  return insertedId;
};

module.exports = {
  addRecipe,
};
