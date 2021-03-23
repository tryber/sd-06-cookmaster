const { createUser, getAllUsers, findOneUser } = require('../Models/usersModel');

/** Status Codes */
const BadRequestCode = 400;
const ConflictCode = 409;

const createNewUser = async (data) => createUser(data);
const getUsers = async () => getAllUsers();
const findUserByEmail = async (email) => findOneUser(email);

const validateEmail = (email) => {
  const pattern = /\S+@\S+.\S+/;
  return pattern.test(email);
};

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || !validateEmail(email)) {
    return res.status(BadRequestCode).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const checkUniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  const allUsers = await getUsers();
  const emailExists = await allUsers.find((users) => users.email === email);

  if (emailExists) {
    return res.status(ConflictCode).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = {
  checkUniqueEmail,
  createNewUser,
  findUserByEmail,
  getUsers,
  validateEmail,
  validateUser,
};
