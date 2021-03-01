const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('users').find().toArray());

const getById = async (id) => connection().then((db) => db
  .collection('users').findOne(ObjectId(id)));

const findUser = async (email) => connection().then((db) => db
  .collection('users').findOne({ email }));

const registerUser = async (objData) => {
  const { insertedId } = await connection().then((db) => db
  .collection('users').insertOne(objData));
  return {
    user: {
      ...objData,
      role: 'user',
      _id: insertedId,
    },
  };
};

module.exports = {
  getAll,
  registerUser,
  getById,
  findUser,
};
