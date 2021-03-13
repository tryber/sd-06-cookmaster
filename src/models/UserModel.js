const conn = require('../utils/connection');

const insertUser = async (user) => {
  const { insertedId } = await conn().then((db) => db.collection('users').insertOne(user));
  return insertedId;
};

const findByEmail = async (email) => conn()
.then((db) => db.collection('users').findOne({ email }));

module.exports = {
  insertUser,
  findByEmail,
};