const getConnection = require('./connection');

const create = async (name, email, password, role) => {
  const createUser = await getConnection('users')
    .then((users) => users.insertOne({ name, email, password, role }));
  return { _id: createUser.insertedId, name, email, password, role };
};

const findByEmail = async (email) => {
  const db = await getConnection('users');
  const result = await db.findOne({ email });

  return result;
};

const findAUser = async (email) => getConnection('users')
  .then((db) => db.findOne({ email }));

module.exports = {
  create,
  findByEmail,
  findAUser,
};
