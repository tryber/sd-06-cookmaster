const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerNewRecipe = async (name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation }));

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      _id: insertedId,
    },
  };
};

const listAllRecipes = async () => connection()
  .then((db) => db.collection('recipes')
    .find().toArray());

const listRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
  .then((db) => db.collection('recipes')
    .findOne(ObjectId(id)));
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const { value } = await connection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
      ));
      
  return value;
};

const deleteRecipe = async (id) => connection()
  .then((db) => db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) }));

module.exports = {
  registerNewRecipe,
  listAllRecipes,
  listRecipeById,
  editRecipe,
  deleteRecipe,
};
