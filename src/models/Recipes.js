const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection().then((db) => db.collection('recipes').find().toArray());
  
const findById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const create = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection().then((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }));
      
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: insertedId,
  };
};

const update = async (name, ingredients, preparation, recipe) => {
  const { _id } = recipe;
  
  await connection().then((db) => db.collection('recipes')
    .updateOne(
      { _id },
      { $set: { name, ingredients, preparation } },
      { upsert: false },
    ));
  
  return {
    _id,
    name,
    ingredients,
    preparation,
    userId: recipe.userId,
  };
};

const remove = async (id) => {
  await connection().then((db) => db.collection('recipes').deleteOne({ _id: id }));
};

const addImage = async (filename, id) => {
  await connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/uploads/${filename}` } },
    { upsert: false },
    ));
    
  const recipe = await connection().then((db) => db.collection('recipes')
    .findOne({ _id: ObjectId(id) }));
    
  return recipe;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  addImage,
};
