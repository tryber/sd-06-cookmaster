const connection = require('./connection');

const CREATED = 201;
const OK = 200;

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

const getRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  
  return [recipes, OK];
};

module.exports = {
  recipeRegister,
  getRecipes,
};
