const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

const findAll = async () => connection().then((db) => db.collection('recipes').find({}).toArray());

const findOne = async (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  findAll,
  findOne,
};
