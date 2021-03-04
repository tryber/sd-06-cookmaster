// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (recipe) => {
  const { insertedId } = await connection().then((db) => db.collection('recipes')
    .insertOne({ recipe }));

  return {
    _id: insertedId,
    ...recipe,
  };
};

module.exports = {
  create,
};
