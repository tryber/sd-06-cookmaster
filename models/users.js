const connection = require('./connection');

const create = async (name, email, password) => {
  const userCreated = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password }));

  const user = {
    name,
    email,
    role: 'user',
    _id: userCreated.insertedId,
  };

  return { user };
};

const findEmailUser = async (email) => {
  const emailUser = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  return emailUser;
};

module.exports = {
  create,
  findEmailUser,
};
