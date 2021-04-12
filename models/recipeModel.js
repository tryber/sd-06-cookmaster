const connection = require('./connection');

const collection = 'recipes';

const createRecipe = (name, ingredients, preparation, userId) => {
  return connection().then((db) => (
    db.collection(collection).insertOne({ name, ingredients, preparation, userId })
  ));
};

const getAllRecipes = () => {
  return connection().then((db) => (
    db.collection(collection).find().toArray()
  ));
};

module.exports = {
  createRecipe,
  getAllRecipes,
};