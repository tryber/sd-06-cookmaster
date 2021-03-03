const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.collection('recipes').find().toArray());

const findById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));

// const findByName = async(recipeName) => 
//   connection().then((db) => db.collection('recipes').findOne({ name: recipeName }));

const create = async (name, ingredients, preparation, userId) =>
  connection()
    .then((db) =>
      db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result);

const update = async (id, newName, newIngredients, newPreparation) =>
  connection()
    .then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: {
        name: newName,
        ingredients: newIngredients,
        preparation: newPreparation,
      } },
      { returnOriginal: false },
    ))
    .then((result) => result.value);

const deleteRecipe = async (id) => 
  connection()
    .then((db) => db.collection('recipes').deleteOne(
      { _id: ObjectId(id) },
    ));

module.exports = {
  getAll,
  findById,
//   findByName,
  create,
  update,
  deleteRecipe,
};