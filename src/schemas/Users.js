const Users = require('../services/Users');

const isBlank = (field) => !field || field === '';

const isEmailValid = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return !regex.test(email);
};

const validateUser = async (name, email, password) => {
  const status400 = { code: 400, message: 'Invalid entries. Try again.' };
  const status409 = { code: 409, message: 'Email already registered' };
  const users = await Users.getAllUsers();
  const doesEmailAlreadyExists = users.some((user) => user.email === email);

  switch (true) {
    case isBlank(name): return status400;
    case isBlank(email): return status400;
    case isEmailValid(email): return status400;
    case isBlank(password): return status400;
    case doesEmailAlreadyExists: return status409;

    default: return {};
  }
};

module.exports = validateUser;