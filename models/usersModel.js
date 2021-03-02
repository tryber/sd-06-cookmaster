const connection = require('./connection');

const create = async (user) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne(user))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

  return { user: { _id: insertedId, ...user } };
};

const findEmail = async (email) => {
  const result = await connection()
    .then((db) => db.collection('users').findOne({ email }))
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });

  return result;
};

module.exports = { create, findEmail };
