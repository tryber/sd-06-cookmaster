const connection = require('../database/connection');

const create = async (name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return insertedId;
};

module.exports = {
  create,
  };