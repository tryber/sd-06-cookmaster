const {
  createUsers,
  getAllUsers,
} = require('../models/userModel');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const INVALID_ENTRIES = 'Invalid entries. Try again.';

const createNewUser = async (data) => createUsers(data);
const getUsers = async () => getAllUsers();

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

async function setValidation(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || name === '' || name === null) {
    return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  }
  if (!email || email === '' || email === null || !validateEmail(email)) {
    return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  }
  if (!password) {
    return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  }
  next();
}

const ifExists = async (req, res, next) => {
  const { email } = req.body;
  const gotUsers = await getUsers();
  const emailExists = await gotUsers.find((users) => users.email === email);

  if (emailExists) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};

module.exports = {
  getUsers,
  createNewUser,
  setValidation,
  ifExists,
};
