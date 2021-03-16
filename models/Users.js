const connection = require('./connection');

const createUser = async (obj) => {
  const answer = await connection()
    .then((db) => db.collection('users').insertOne(obj));
  return answer;
};

const findUserByEmail = async (email) => {
  const answer = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return answer;
};

module.exports = {
  createUser,
  findUserByEmail,
};