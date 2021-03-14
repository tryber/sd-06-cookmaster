const { ObjectID } = require('mongodb');
const connection = require('./connections');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
  };
};

const getAllRecipes = async () => {
  const recipes = await connection().then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await connection().then((db) => db.collection('recipes').findOne(ObjectID(id)));
  return recipe;
};

const updateRecipe = async (recipe) => {
  const { name, ingredients, preparation, id, userId } = recipe;
  connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectID(id) },
    { $set: { name, ingredients, preparation } },
  ));

  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

const removeRecipe = async (id) => connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectID(id) }));

const addImage = async (recipe, image) => {
  const { name, ingredients, preparation, _id, userId } = recipe;
  connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectID(_id) },
    { $set: { image } },
  ));

  return {
    _id,
    name,
    ingredients,
    preparation,
    userId,
    image,
  };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  removeRecipe,
  addImage,
};