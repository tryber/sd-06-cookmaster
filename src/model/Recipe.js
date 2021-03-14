const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

// Find All Recipes
const getAll = async () => {
  const recipes = await connection().then((db) => db.collection('recipes').find().toArray());

  return recipes;
};

// Find by Id Recipe
const findById = async (id) => {
  const recipe = connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .catch((error) => console.error(error));
  
  return recipe;
};

// Add New Recipe
const create = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .catch((err) => console.error(err));

  return { recipe: { _id: insertedId, name, ingredients, preparation, userId } };
};

// Update Recipe
const update = async (recipe, name, ingredients, preparation) => {
  const { id, userId } = recipe;
  await connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
      ))
    .catch((err) => console.error(err));

  return { _id: id, name, ingredients, preparation, userId };
};

// Update Image
const updateImage = async (recipe, image) => {
  console.log(recipe);
  const { _id, name, ingredients, preparation, userId } = recipe;
  await connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(_id) }, { $set: { image } },
      ))
    .catch((err) => console.error(err));

  return { _id, name, ingredients, preparation, userId, image };
};

// Remove Recipe
const remove = async (id) => {
  await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }))
    .catch((err) => console.error(err));
  return true;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  updateImage,
  remove,
};
