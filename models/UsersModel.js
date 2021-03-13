const connect = require('./connection');
// const { ObjectID } = require('mongodb');

const getAll = async () => connect().then((db) => db.collection('users').find().toArray());
const getEmail = async (email) => connect().then((db) => db.collection('users').findOne({ email }));

const postUser = async ({ name, email, password, role = 'user' }) => {
  const { insertedId } = await connect().then((db) => db.collection('users').insertOne(
    { name, email, password, role },
  ));
  return {
    user: {
      name,
      email,
      role,
      _id: insertedId,
  },
  };
};

module.exports = {
  getAll,
  getEmail,
  postUser,
};
