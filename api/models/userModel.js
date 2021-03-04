const connection = require('../database/connection');

const createUser = async (name, email, password, role) => {
  const { insertedId } = await connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role }))
  .then((res) => res)
  .catch((err) => console.error(err.message));

  return {
    name,
    email,
    role,
    _id: insertedId,
  };
};

const findByEmail = async (email) => {
  try {
    const db = await connection();
    const res = await db.collection('users').find({ email }).toArray();
    return res;
  } catch (err) {
    console.error(err.message);
    // throw Error(err.message)
  }
};

module.exports = {
  createUser,
  findByEmail,
};
