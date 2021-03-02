const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const insertToDb = async (collection, data) => {
  const db = await connection(collection);
  const result = await db.insertOne(data);
  return result.ops[0];
};

module.exports = {
  insertToDb,
};