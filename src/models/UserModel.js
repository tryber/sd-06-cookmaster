const { ObjectId } = require('mongodb');
const Users = require('./UserSchema');

const createUserDb = async (name, email, password) => {
  const newUser = await Users.create({ name, email, password, role: 'user' });

  return newUser;
};

const loginUserDb = async (email) => {
  const newUser = await Users.findOne({ email });

  return newUser;
};

const salvedTokenDb = async (loginUser, token) => {
  const { _id } = loginUser;

  const tokenUser = await Users.updateOne(
    { _id: ObjectId(_id) }, 
    { $set: { token } },
  );

  return tokenUser;
};

const searchUserByTokenDb = async (token) => {
  const user = await Users.findOne({ token });

  return user;
};

module.exports = {
  createUserDb,
  loginUserDb,
  salvedTokenDb,
  searchUserByTokenDb,
};
