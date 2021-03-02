const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => connection().then((db) => db.collection('recipes')
.findOne(ObjectId(id)));

const add = async (name, ingredients, preparation, userId) => {
  const { insertedId } = connection().then((db) => db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId }));
  return { 
    _id: insertedId,
    name,
    ingredients,
    preparation,
    userId,
   };
};

const update = async (id, name, ingredients, preparation) => {
  await connection().then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, 
    { $set: { name, ingredients, preparation } }));
  return { _id: id, name, ingredients, preparation };
};

const remove = async (id) => {
  await connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return { _id: id };
};

const addImage = async (id, image) => {
  const { _id, name, ingredients, preparation, userId } = await getById(id);
  await connection().then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image } }));
  return { _id, name, ingredients, preparation, userId, image };
};

module.exports = { getAll, getById, add, update, remove, addImage };