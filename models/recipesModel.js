const connection = require('./connection');

const getAllRecipes = async () => {
  const recipesList = await connection('recipes').then((db) => db.find().toArray());
  return recipesList;
};

const insertNewRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection('recipes').then((db) => db.insertOne(
    { recipe: { name, ingredients, preparation, userId } },
    { name: 1, ingredients: 1, preparation: 1, userId: 1, _id: 1 },
  ));

  return newRecipe.ops;
};

module.exports = {
  insertNewRecipe,
  getAllRecipes,
};
