const Users = require('../models/user');

const MIN_USER = 0;
const STATUS_401 = 401;
const ERR = { message: 'All fields must be filled' };
const ERR_WRONG_EMAIL_PASS = { message: 'Incorrect username or password' };

const verifyUser = async (response, email, password) => {
  const allUsers = await Users.getAllUsers();
  if (allUsers.length !== MIN_USER) {
    const found = allUsers.find((user) => user.email === email && user.password === password);
    if (!found) return response.status(STATUS_401).json(ERR_WRONG_EMAIL_PASS);
    return found;
  }
  return null;
};

const verifiedEmptyFields = async (response, email, password) => {
  if (!email || !password) return response.status(STATUS_401).json(ERR);
  return null;
};

module.exports = {
  verifyUser,
  verifiedEmptyFields,
};
