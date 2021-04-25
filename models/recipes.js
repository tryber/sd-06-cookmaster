const { ObjectID } = require('mongodb');
const getConnection = require('./connection');

const createRecipes = async (recipe) => getConnection('recipes')
  .then((recipes) => recipes.insertOne(recipe))
  .then(() => ({
    recipe,
    }
  ));

const getAllRecipes = async () => getConnection('recipes')
  .then((recipes) => recipes.find({}).toArray());

const getRecipeById = async (id) => getConnection('recipes')
  .then((recipes) => recipes.findOne({ _id: ObjectID(id) }));

const editRecipeById = async (id, recipe, userId) => {
  const { name, ingredients, preparation, image = '' } = recipe;
  const recipeToEdit = await getConnection('recipes');
  await recipeToEdit.updateOne(
    { _id: ObjectID(id) },
    { $set: { name, ingredients, preparation, image } },
  );
  return { _id: id, name, ingredients, preparation, userId, image };
};

const deleteRecipe = async (id) => getConnection('recipes')
  .then((recipes) => recipes.deleteOne({ _id: ObjectID(id) }));

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipe,
};
