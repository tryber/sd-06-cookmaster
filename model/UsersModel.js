const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('users').find().toArray());

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
};
