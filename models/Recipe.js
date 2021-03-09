const connection = require('./connection');

const create = async (name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

const findAll = async () => connection().then((db) => db.collection('recipes').find({}).toArray());

module.exports = {
  create,
  findAll,
};
