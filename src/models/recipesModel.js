const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAllRecipe = async () => {
  const getRecipeLIst = await connection('recipes').then((db) => db.find().toArray());
  return getRecipeLIst;
};

const findByIdRecipe = async (id) => {
  const foundRecipe = await connection('recipes').then((db) => db.findOne(ObjectId(id)));
  return foundRecipe;
};

const addNewRecipe = async (name, ingredients, preparation, userId) => {
  const getRecipe = await connection('recipes')
    .then((db) => db.insertOne({ name, ingredients, preparation, userId }));

  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: getRecipe.insertedId,
  };
};

const recipeUpdatedModel = async (id, name, ingredients, preparation) => {
  const getRecipeUpdated = await connection('recipes')
    .then((db) => db.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
      ));

  return getRecipeUpdated.value;
};

const recipeDeleteModel = async (id) => {
  const getRecipesdeleted = await connection('recipes')
    .then((db) => db.findOneAndDelete({ _id: ObjectId(id) }));

  return getRecipesdeleted.value;
};

const insertImageModel = async (id, image) => {
  const getRecipeUpdated = await connection('recipes')
    .then((db) => db.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { image } },
        { returnOriginal: false },
      ));

  return getRecipeUpdated.value;
};

module.exports = {
  addNewRecipe,
  findAllRecipe,
  findByIdRecipe,
  recipeUpdatedModel,
  recipeDeleteModel,
  insertImageModel,
};
