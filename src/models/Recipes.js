const connection = require('./connection');

const collection = 'recipes';

const getAllRecipes = async () => {
  const result = await connection().then((db) => db
  .collection(collection).find().toArray());

  return result;
};

const getRecipeById = async (id) => {
  const result = await connection().then((db) => db
  .collection(collection).findOne({ _id: id }));

  return result;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection().then((db) => db
    .collection(collection).insertOne({ name, ingredients, preparation }));

  const newUser = {
    recipe: {
      name,
      ingredients,
      preparation,
      userId: userId.toString(),
      _id: insertedId.toString(),
    },
  };

  return newUser;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
};
