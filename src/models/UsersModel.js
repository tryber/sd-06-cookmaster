const connection = require('./connection');

const registerNewUser = async (name, email) => {
  const { insertedId } = await connection()
  .then((db) => db.collection('users')
    .insertOne({ name, email, role: 'user' }));
  
  return {
    user: {
      name,
      email,
      role: 'user',
      _id: insertedId,
    },
  };
};

module.exports = {
  registerNewUser,
};
