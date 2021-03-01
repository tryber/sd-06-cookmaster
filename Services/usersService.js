const { createUser, getAllUsers } = require('../Model/usersModel');

const fourHundred = 400;
const fourHundredNine = 409;

const createNewUser = async (data) => createUser(data);
const getUsers = async () => getAllUsers();

const validateEmail = (email) => {
  const pattern = /\S+@\S+.\S+/;
  return pattern.test(email);
};

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || !validateEmail(email)) {
    return res.status(fourHundred).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const checkUniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  const allUsers = await getUsers();
  const emailExists = await allUsers.find((users) => users.email === email);

  if (emailExists) {
    return res.status(fourHundredNine).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = {
  checkUniqueEmail,
  createNewUser,
  getUsers,
  validateEmail,
  validateUser,
};
