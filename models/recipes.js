const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
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

const getAll = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('recipes').find().toArray());

  return allProducts;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipeById = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));

  return recipeById;
};

const update = async (id, name, ingredients, preparation) => {
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

module.exports = {
  create,
  getAll,
  getById,
  update,
};
