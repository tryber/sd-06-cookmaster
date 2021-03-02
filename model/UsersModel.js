const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('users').find().toArray());

const getById = async (id) => connection().then((db) => db
  .collection('users').findOne(ObjectId(id)));

const findUser = async (email) => connection().then((db) => db
  .collection('users').findOne({ email }));

const registerUser = async (objData, userType = 'user') => {
  const newUser = {
    ...objData,
    role: userType,
  };

  const { insertedId } = await connection().then((db) => db
  .collection('users').insertOne(newUser));
  return {
    user: {
      ...newUser,
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
