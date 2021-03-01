const connection = require('./connection');

const create = async (name, email, password) => {
  const userCreated = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password }));

  const user = {
    name,
    email,
    role: 'user',
    _id: userCreated.insertedId,
  };

  return { user };
};

module.exports = { create };
