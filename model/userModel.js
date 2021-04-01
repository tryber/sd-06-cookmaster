const { ObjectId } = require('bson');
const db = require('./connection');

const connection = db.getCollection('users');

const getUserByEmail = async (email) => {
  const collection = await connection;
  const result = await collection.findOne({ email });

  return result;
};

const getUserById = async (id) => {
  const collection = await connection;
  const result = await collection.findOne(ObjectId(id));

  return result;
};

const createUser = async ({ name, email, password }) => {
  const collection = await connection;
  const result = await collection.insertOne({ name, email, password, role: 'user' });

  return { _id: result.insertedId, name, email, password, role: 'user' };
};

const getAllUsers = async () => {
  const collection = await connection;
  const result = await collection.find();
  return result.toArray();
};

module.exports = {
  getUserByEmail,
  createUser,
  getAllUsers,
  getUserById,
};
