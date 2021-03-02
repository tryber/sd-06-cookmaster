const Users = require('./UserSchema');

const createUserDb = async (name, email, password) => {
  const newUser = await Users.create({ name, email, password, role: 'user' });

  return newUser;
};

const loginUserDb = async (email) => {
  const newUser = await Users.findOne({ email });

  return newUser;
};

module.exports = {
  createUserDb,
  loginUserDb,
};
