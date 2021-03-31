const { getUserByEmail, createUser } = require('../model/userModel');

const validateCreateUSer = async (query) => {
  const isUserAlreadyExists = await getUserByEmail(query.email);

  if (isUserAlreadyExists) return null;

  const userCreated = await createUser(query);

  return userCreated;
};

module.exports = {
  validateCreateUSer,
};
