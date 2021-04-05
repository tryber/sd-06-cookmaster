const connection = require('../database');

const createUser = async (name, email, password) => {
  const newUser = await connection().then((db) => 
    db.collection('users').insertOne({ name, email, password, role: 'user' }));

  const [userCreated] = newUser.ops;

  const { _id: id } = userCreated;

  return {
    user: {
      name: userCreated.name,
      email: userCreated.email,
      role: userCreated.role,
      _id: id,
    },
  };
};

const findUserByEmail = async (email) => {
  const user = await connection().then((db) => 
    db.collection('users').findOne({ email }));

  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
};
