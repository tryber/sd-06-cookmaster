const db = require('./connection');

const connection = db.getCollection('users');

const getUserByEmail = async (email) => {
  const collection = await connection;
  const result = await collection.findOne({ email });

  return result;
};

const createUser = async ({ name, email, password }) => {
  const collection = await connection;
  const result = await collection.insertOne({ name, email, password, role: 'user' });

  return { user: { _id: result.insertedId, name, email, password, role: 'user' } };
};

module.exports = {
  getUserByEmail,
  createUser,
};
