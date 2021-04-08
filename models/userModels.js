const connection = require('../connection/connection');

const coll = 'users';

const getByEmail = async (email) => (
  connection().then((db) => db.collection(coll).findOne({ email }))
);

const createNewUser = async (name, email, password) => {
  const { ops } = await connection().then((db) => db.collection(coll).insertOne({
    name,
    email,
    password,
    role: 'user',
  }));

  return ops[0];
};

module.exports = {
  getByEmail,
  createNewUser,
};
