const usersModel = require('../models/usersModel');

const ERR = 400;
const EXISTS = 409;

const getAll = async () => usersModel.getAll();

const create = async (data) => usersModel.create(data);

const validateEmail = (email) => {
  const pattern = /\S+@\S+.\S+/;
  return pattern.test(email);
};

const validateUser = async (req, res, next) => {
 const { name, email, password } = req.body;

 if (!name || !email || !password || !validateEmail(email)) {
  return res.status(ERR).json({ message: 'Invalid entries. Try again.' });
}

next();
};

const checkUniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  const usersList = await usersModel.getAll();
  const Exists = await usersList.find((users) => users.email === email);

  if (Exists) {
    return res.status(EXISTS).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = {
  getAll,
  create,
  validateUser,
  checkUniqueEmail,
};
