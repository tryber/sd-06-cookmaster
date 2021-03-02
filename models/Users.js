const connection = require('./connection');

const userRegister = async ({ name, email, role, password }) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, role, password }));

  return {
    user: {
      name,
      email,
      role,
      _id: insertedId,
    },
  };
};

module.exports = {
  userRegister,
};
