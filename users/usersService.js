const usersModel = require('./usersModel');

const createUser = async (newUser) => {
  console.log('USERS -SERVICE');

  const verifyExistsEmail = await usersModel.findByEmail(newUser.email);

  if (verifyExistsEmail !== null) {
    return { err: { message: 'Email already registered', statusCode: 409 } };
  }

  const createdUser = await usersModel.createUser(newUser);

  return { createdUser };
};

module.exports = {
  createUser,
};
