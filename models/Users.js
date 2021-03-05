const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAll = async () => {
  const db = await connection();
  return db.collection('users').find({}).toArray();
};

const findOne = async (id) => {
  const db = await connection();
  return db.collection('users').findOne({ _id: ObjectId(id) }, { password: 0 });
};

const findOneByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email: { $eq: email } });
  console.log(user);
  return user;
};

const createOne = async (user) => {
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne(user);
  return insertedId;
};

const deleteOne = async (id) => {
  const db = await connection();
  return db.collection('users').deleteOne({ _id: ObjectId(id) });
};

const updateOne = async (id, user) => {
  const db = await connection();
  return db.collection('users').insertOne({ _id: ObjectId(id), ...user });
};

module.exports = {
  updateOne,
  findAll,
  findOne,
  deleteOne,
  createOne,
  findOneByEmail,
};