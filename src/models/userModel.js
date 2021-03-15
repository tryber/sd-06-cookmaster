const connection = require('../service/connection');

const createUser = async (user) => {
  const { name, email, role } = user;
  const result = await connection()
    .then((db) => db.collection('users').insertOne(user))
    .then((aux) => ({ user: { name, email, role, _id: aux.insertedId } }));
  };
  return result.ops[0];
};

const allUser = async () => {
  const result = connection().then((db) => db.collection('users').find().toArray);
  return result;
};

const findUserByEmail = async (email) => {
  const result = connection().then((db) => db.collection('users').findOne({ email }));
  return result;
};

const loginConfirm = async (email, password) => {
  const result = connection().then((db) => db.collection('users').findOne(email, password));
  return result;
};

module.export = {
  createUser,
  allUser,
  findUserByEmail,
  loginConfirm,
};
