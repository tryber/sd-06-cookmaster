const Users = require('../service/UserService');

const erros = {
  invalid_entries: { code: 400, message: 'Invalid entries. Try again.' },
  email_exist: { code: 409, message: 'Email already registered' },
};

const isBlank = (field) => !field || field === '';

const isEmailValid = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return !regex.test(email);
};

const doesEmailAlreadyExist = async (email) => {
  const users = await Users.getAll();
  return users.some((user) => user.email === email);
};

const validate = async (name, email, password) => {
  const emailExist = await doesEmailAlreadyExist(email);
  switch (true) {
    case isBlank(name): return erros.invalid_entries;
    case isBlank(email): return erros.invalid_entries;
    case isEmailValid(email): return erros.invalid_entries;
    case isBlank(password): return erros.invalid_entries;
    case emailExist: return erros.email_exist;
    default: return {};
  }
};

module.exports = {
  validate, 
};
