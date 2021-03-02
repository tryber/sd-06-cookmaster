const connection = require('./connection');

const register = async (name, email, password) => {
  const { insertedId } = await connection().then((db) => db.collection('users')
    .insertOne({ name, email, password, role: 'user' }));
  return { user: { name, email, password, role: 'user', _id: insertedId } };
};

const findByEmail = async (email) => connection().then((db) => db
  .collection('users').findOne({ email }));

module.exports = { register, findByEmail };
