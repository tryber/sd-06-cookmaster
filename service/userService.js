const { getUserByEmail, createUser } = require('../model/userModel');

const validateCreateUser = async (query) => {
  const isUserAlreadyExists = await getUserByEmail(query.email);

  if (isUserAlreadyExists) return null;

  const userCreated = await createUser(query);
  const { password, ...user } = userCreated;

  return user;
};

module.exports = {
  validateCreateUser,
};
