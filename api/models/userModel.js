const connection = require('../database/connection');

const createUser = async (name, email, password, role) => {
  const { insertedId } = await connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role }))
  .then((res) => res)
  .catch((err) => console.error(err));

  return {
    name,
    email,
    role,
    _id: insertedId,
  };
};

const checkEmailExists = (email) => connection()
    .then((db) => db.collection('users').find({ email }).toArray())
    .then((res) => res)
    .catch((err) => err);

module.exports = {
  createUser,
  checkEmailExists,
};
