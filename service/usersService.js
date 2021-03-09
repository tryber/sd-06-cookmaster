const { createUser, getAllUsers } = require('../models/userModel');

const createNewUser = async (data) => createUser(data);

const getUsers = async () => getAllUsers();

const validateEmail = (email) => {
  const pattern = /\S+@\S+.\S+/;
  return pattern.test(email);
};

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const checkUniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  const allUsers = await getUsers();
  const emailOk = await allUsers.find((users) => users.email === email);

  if (emailOk) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = {
  getUsers,
  createNewUser,
  validateEmail,
  validateUser,
  checkUniqueEmail,
};
