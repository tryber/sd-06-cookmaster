const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const create = async (name, ingredients, preparation) => connection().then((db) => 
  db.collection('recipes').insertOne({ name, ingredients, preparation }));

// 5
const getById = async (id) => connection().then((db) => 
    db.collection('recipes').findOne({ _id: ObjectId(id) }));
// 5

// 7
const update = async (id, name, ingredients, preparation) => 
  // updateOne para findOneAndUpdate para conseguir retornar o produto atualizado após edição
  connection().then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false }, // retorna o poduto atualizado após edição
  ));
// 7

// 8
const remove = async (id, name, ingredients, preparation) =>
  connection().then((db) => db.collection('recipes').findOneAndDelete(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  ));
// 8

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};