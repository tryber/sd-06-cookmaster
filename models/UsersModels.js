const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, email, password, role='user') => {
  const { insertedId } = await connection().then((db) =>
    db.collection('users').insertOne({
      name,
      email,
      password,
      role,
    }),
  );

  return {
    user: {
      insertedId,
      name,
      email,
      password,
      role,
    }
  };
};