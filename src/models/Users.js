const connection = require('./connection');

const collectionName = 'users';

const createUsers = async (name, email, password) => {
  const { insertedId } = await connection()
    .then((db) => db.collection(collectionName).insertOne({
      name, email, password,
    }));
  return insertedId;
};

const findByEmail = async (email) => {
  const emailResponse = await connection()
    .then((db) => db.collection(collectionName).findOne({
      email,
    }));
  return emailResponse;
};

const createAdmin = async (name, email, password) => {
  const { insertedId } = await connection()
    .then((db) => db.collection(collectionName).insertOne({
      name, email, password, role: 'admin',
    }));
  return insertedId;
};

module.exports = {
  createUsers,
  findByEmail,
  createAdmin,
};
