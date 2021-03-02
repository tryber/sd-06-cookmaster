const connection = require('./connection');

const create = async (name, email, password) => {
  const { insertedId } = await connection().then((db) => db.collection('users').insertOne({
    name,
    email,
    password,
    role: 'user',
  }));

  return {
    user: {
      name,
      email,
      password,
      role: 'user',
      _id: insertedId,
    },
  };
};

module.exports = {
  create,
};
