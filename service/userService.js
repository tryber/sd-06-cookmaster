const { getUserByEmail, createUser } = require('../model/userModel');

const validateCreateUSer = async (query) => {
  const result = await getUserByEmail(query.email);

  if (result) return null;

  const userCreated = await createUser(query);

  return userCreated;
};

module.exports = {
  validateCreateUSer,
};
