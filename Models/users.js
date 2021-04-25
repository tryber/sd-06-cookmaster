const connection = require('./connection');

const createUser = async (name, email, password, role) => {
  const newUser = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));
  return { _id: newUser.insertedId, name, email, password, role };
};

const emailAlreadyExists = async (email) => {
    const emailExists = await connection()
      .then((db) => db.collection('users').findOne({ email }));
      return emailExists;
};

module.exports = {
    createUser,
    emailAlreadyExists,
  };