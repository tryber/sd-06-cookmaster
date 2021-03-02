const model = require('../models/usersModel');

const emailCheck = require('../utils/regexCheck');
const { invalidEntry, emailAlreadyInUse } = require('../utils/errorsLibrary');

const createUser = async (newUser) => {
  const { name, email, password } = newUser;
  const emailAlreadyExists = await model.getByEmail(email);

  if (!name || !email || !password || !emailCheck(email)) throw invalidEntry;
  if (emailAlreadyExists) throw emailAlreadyInUse;

  return model.createUser(newUser);
};

module.exports = { createUser };
