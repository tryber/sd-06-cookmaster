const connection = require('./connection');

const getAllRecipes = async () => {
  const getRecipes = await connection()
  .then((db) => db.collection('recipes').find().toArray());
  return getRecipes;
};

const createRecipe = async (name, ingredients, preparation, userID) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userID }));
  return ({
      _id: insertedId,
      name,
      ingredients,
      preparation,
      userID,
  });
};

module.exports = {
  getAllRecipes,
  createRecipe,
};
