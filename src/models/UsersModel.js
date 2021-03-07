const connection = require('../database/connection');

const create = async (name, email, password) => {
  const { role } = { role: 'user' };
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));
  return ({ _id: insertedId, name, email, role });
};

const getUserByEmail = async (email) => connection().then((db) => db.collection('users')
.findOne({ email }));

module.exports = {
  create,
  getUserByEmail,
  };