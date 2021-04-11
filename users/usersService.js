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

const createAdmin = async (userRole, newAdmin) => {
  console.log('CREATE ADMIN SERVICE');

  if (userRole !== 'admin') {
    return { message: 'Only admins can register new admins' };
  }

  const createdAdmin = await usersModel.createAdmin(newAdmin);
  console.log('USUARIO CRIADO serice', createdAdmin);

  return { createdAdmin };
};

module.exports = {
  createUser,
  createAdmin,
};
