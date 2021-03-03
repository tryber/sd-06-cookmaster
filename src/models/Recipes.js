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

const editRecipeById = async (reqBody, userId, id) => {
  const { name, ingredients, preparation } = reqBody;
 await connection().then((db) => db
  .collection(collection).updateOne({ _id: id }, {
    $set: { name, ingredients, preparation },
  }));

  const updatedRecipe = {
      _id: id.toString(),
      name,
      ingredients,
      preparation,
      userId: userId.toString(),
  };

  return updatedRecipe;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection().then((db) => db
    .collection(collection).insertOne({ name, ingredients, preparation }));

  const newRecipe = {
    recipe: {
      name,
      ingredients,
      preparation,
      userId: userId.toString(),
      _id: insertedId.toString(),
    },
  };

  return newRecipe;
};

const deleteRecipe = async (id) => {
  const status = 204;
  await connection().then((db) => db
    .collection(collection).deleteOne({ _id: id }));

  return status;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  editRecipeById,
  deleteRecipe,
};
