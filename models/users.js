const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const all = await connection('users').then(db => db.find().toArray());

  return all;
};

const findByEmail = async (email) => {
  const found = await connection('users').then(db => db.findOne({ email }));

  return found;
};

const login = async (name, email, password) => {
  const user = await connection('users').then(db => db.insertOne({ name, email, password }));

  return {
    user: {
      name,
      email,
      role: 'user',
      _id: user.insertedId,
    }
  };
}

module.exports = {
  getAll,
  findByEmail,
  login,
};
