const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

const findAll = async () => connection().then((db) => db.collection('recipes').find({}).toArray());

const find = async (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const edit = async (id, name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  ));

module.exports = {
  create,
  findAll,
  find,
  edit,
};
