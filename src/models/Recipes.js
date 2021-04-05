const { ObjectId } = require('mongodb');
const connection = require('../database');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipeCreated = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  const recipe = {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipeCreated.insertedId,
  };

  return { recipe };
};

const findAllRecipes = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('recipes').find().toArray());

  return allProducts;
};

const findRecipesById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipeById = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));

  return recipeById;
};

const updateRecipeById = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;

  await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

  const editRecipe = {
    _id: ObjectId(id),
    name,
    ingredients,
    preparation,
  };
  
  return editRecipe;
};

const updateImageRecipe = async (id, imagePath) => {
  const { value } = await connection()
    .then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) }, 
      { $set: { image: imagePath } },
      { returnOriginal: false },
    ));
  return value;
};

const deleteRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipeById = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));

  await connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

  return recipeById;
};

module.exports = {
  createRecipe,
  findAllRecipes,
  findRecipesById,
  updateRecipeById,
  updateImageRecipe,
  deleteRecipeById,
};