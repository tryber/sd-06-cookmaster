// const connection = require('./dataBase');

const Users = require('./UserSchema');

const createUserDb = async (name, email, password) => {
  const newUser = await Users.create({ name, email, password, role: 'user' });

  return newUser;
};

// const createUserDb = async (name, email, password) => {
//   const newUser = connection().then((db) => 
//     db.collection('users').insertOne({ name, email, password, role: 'user' }));

//     return newUser;
// };

module.exports = {
  createUserDb,
};
