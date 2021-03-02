const connection = require('./connection');

const getAllRecipes = async () => connection()
    .then((database) => database.collection('recipes').find().toArray());

const createRecipe = async (userId, name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ userId, name, ingredients, preparation }));
  // console.log('insertedid', insertedId);
    return {
    recipeId: insertedId,
  };
};

const getRecipeById = async (id) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(id));
  return recipe;
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeById,
};
