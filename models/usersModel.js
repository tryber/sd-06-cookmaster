const getCollection = require('./connection');

const createUser = async (name, email, password) => {
  const newUser = await getCollection('users')
  .then((users) => users.insertOne({ name, email, password, role: 'user' }));

  return {
    name,
    email,
    password,
    role: 'user',
    _id: newUser.insertedId,
  };
};

const isEmailUnique = async (email) => {
  const db = await getCollection('users');

  const userEmail = await db.findOne({ email });

  if (userEmail) return false;

  return true;
};

const findUserByEmail = async (email) => {
  const db = await getCollection('users');

  const user = await db.findOne({ email });

  return user;
};

module.exports = {
  createUser,
  isEmailUnique,
  findUserByEmail,
};
