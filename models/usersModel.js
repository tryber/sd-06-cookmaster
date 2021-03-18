const connection = require('./connection');

const collection = 'users';

const createUser = async (newUser) => {
  const dataBase = await connection(collection);

  const userWithRole = newUser;
  userWithRole.role = 'user';

  const result = await dataBase.insertOne(userWithRole);
  delete userWithRole.password;

  return { _id: result.insertedId, ...userWithRole };
};

const getByEmail = async (email) => {
  const userByEmail = await connection(collection);
  return userByEmail.findOne({ email });
};

module.exports = {
  createUser,
  getByEmail,
};
