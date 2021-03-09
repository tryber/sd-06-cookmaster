const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

const findAll = () => connection().then((db) => db.collection('recipes').find({}).toArray());

const find = (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const edit = (id, name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  ));

const remove = (id) => connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  findAll,
  find,
  edit,
  remove,
};
