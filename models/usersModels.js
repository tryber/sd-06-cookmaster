const connection = require('./connection');

const insertUser = async (name, email, password) => {
  const result = await connection()
    .then((db) => db
      .collection('users')
      .insertOne({ name, email, password, role: 'user' }));
  const user = {
    user: {
      name,
      email,
      role: 'user',
      _id: result.insertedId,
    },
  };
  return user;
};

const login = async (email, password) => 
  connection()
    .then((db) => db
      .collection('users')
      .findOne({ email, password }))
    .catch((error) => console.log(error.message));

const verifyUnique = async (email) => 
  connection()
    .then((db) => db
      .collection('users')
      .findOne({ email }));

module.exports = {
  insertUser,
  verifyUnique,
  login,
};