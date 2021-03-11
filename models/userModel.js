const { ObjectId } = require('mongodb');
const conn = require('./connection');

const findByEmail = async (email) => {
  const db = await conn();
  return db.collection('users').findOne({ email });
};

const findById = async (id) => {
  const db = await conn();
  return db.collection('users').findOne(ObjectId(id));
};

const addUser = async (email, password, name, role = 'user') => {
  const db = await conn();
  return (
    await db.collection('users').insertOne({ email, password, name, role })
  ).ops[0];
};

const emailIsValid = (email = '') => email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/i);

const passwordIsValid = (password = '') => password.length > 5;

const confirmPass = (password = '', confirmPassword = '') =>
  password === confirmPassword;

const nameIsValid = (name = '') => name.match(/^\w{3,}/i);

const updateUser = async (id, email, password, name) => {
  const db = await conn();
  return db.collection('users').updateOne(
    { _id: ObjectId(id) },
    {
      $set: { email, password, name, role: 'user' },
    },
  );
};

module.exports = {
  findByEmail,
  findById,
  addUser,
  emailIsValid,
  passwordIsValid,
  confirmPass,
  nameIsValid,
  updateUser,
};
