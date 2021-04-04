const { ObjectId } = require('mongodb');
const connection = require('../connection');

const createRecipe = async (newRecipe) => {
  console.log('RECIPES MODEL');
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne(newRecipe));
  return {
    recipe: {
      name: newRecipe.name,
      ingredients: newRecipe.ingredients,
      preparation: newRecipe.preparation,
      userId: newRecipe.userId,
      _id: insertedId,
    },
  };
};

const getAllRecipes = async () => {
  console.log('GET ALL MODEL');

  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const findById = async (id) => {
  console.log('FIND BY ID MODEL');

  const result = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

  return result;
};

const updateRecipe = async (editedRecipe) => {
  console.log('UPDATE RECIPE MODEL');
  const { recipeId, name, ingredients, preparation } = editedRecipe;
  const { userId } = await findById(recipeId);

  await connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(recipeId) }, {
      $set: {
        name, ingredients, preparation, userId,
      },
    }));

  return { _id: recipeId, name, ingredients, preparation, userId };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findById,
  updateRecipe,
};
