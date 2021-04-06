const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((dbs) => dbs.collection('recipes').find().toArray());

const createNewRecipe = async (recipe) => {
  const { name, ingredients, preparation, userId } = recipe;
  return connection()
    .then((dbs) => dbs.collection('recipes')
      .insertOne(({
        name,
        ingredients,
        preparation,
        userId,
      })));
};

const findRecipe = async (id) => {
  const product = await connection()
  .then((dbs) => dbs
    .collection('recipes')
    .findOne({ _id: ObjectId(id) }))
    .catch(() => false);
return product;
};

const updateRecipes = async (id, recipeToUpdate) => {
  const { name, ingredients, preparation, userId } = recipeToUpdate;
  await connection().then((dbs) => {
    dbs.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } });
  });
  return recipeToUpdate;
};

const deleteRecipes = async (id) =>
  connection().then((dbs) =>
    dbs.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const addImageInRecipe = async (objectToAddImage) => {
  const { id, searchRecipe: { image } } = objectToAddImage;
  await connection().then((dbs) => {
    dbs.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } });
  });
};

module.exports = {
  getAllRecipes,
  createNewRecipe,
  findRecipe,
  updateRecipes,
  deleteRecipes,
  addImageInRecipe,
};
