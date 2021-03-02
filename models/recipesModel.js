const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const create = async (data) => connection().then((db) => db.collection('recipes').insertOne(data));

const getById = async (id) => connection().then((db) => db.collection('recipes')
  .findOne(ObjectId(id)));

const update = async (id, data) => connection().then((db) => db.collection('recipes')
  .updateOne({
    _id: ObjectId(id),
  }, {
    $set: { name: data.name, ingredients: data.ingredients, preparation: data.preparation },
  }));

module.exports = {
  getAll,
  create,
  getById,
  update,
};
