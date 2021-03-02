const connection = require('./connection');

const createUser = async (name, email, password, role) => {
  const newUser = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));
  return newUser.ops[0];
};

const emailAlreadyExists = async (email) => (
    connection()
      .then((db) => db.collection('users').findOne({ email }))
  );

module.exports = {
    createUser,
    emailAlreadyExists,
  };