const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const create = async (name, ingredients, preparation) => 
  connection().then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

module.exports = {
  getAll,
  create,
};