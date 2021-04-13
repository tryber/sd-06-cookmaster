const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'recipes';

const createRecipe = (name, ingredients, preparation, userId) => (
  connection().then((db) => (
    db.collection(collection).insertOne({ name, ingredients, preparation, userId })
  ))
);

const getAllRecipes = () => (
  connection().then((db) => (
    db.collection(collection).find().toArray()
  ))
);
const getRecipeById = (id) => (
  connection().then((db) => (
    db.collection(collection).findOne(ObjectId(id))
  ))
);

const editRecipe = (id, receivedRecipe, userId) => {
  const { name, ingredients, preparation } = receivedRecipe;
  return connection().then((db) => (
    db.collection(collection).updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId } },
    )
  ));
};

const deleteRecipe = (id) => (
  connection().then((db) => (
    db.collection(collection).deleteOne({ _id: ObjectId(id) })
  ))
);

const addRecipeImage = (id, imgURL) => (
  connection().then((db) => (
    db.collection(collection).updateOne(
      { _id: ObjectId(id) },
      { $set: { image: imgURL } },
    )
  ))
);

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addRecipeImage,
};