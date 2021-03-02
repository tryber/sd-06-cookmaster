const UserService = require('../service/UserService');

const erros = {
  invalid_entries: { code: 400, message: 'Invalid entries. Try again.' },
  email_exist: { code: 409, message: 'Email already registered' },
  fields_must_be_filled: { code: 401, message: 'All fields must be filled' },
  Inconrrect_user_password: { code: 401, message: 'Incorrect username or password' },
};

const isBlank = (field) => !field || field === '';

const isEmailValid = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return !regex.test(email);
};

const doesEmailAlreadyExist = async (email) => {
  const users = await UserService.getAll();
  // return (user !== undefined);
  return users.some((user) => user.email === email);
};

const loginIsCorrect = async (email, password) => {
  const user = await UserService.findByEmail(email);
  return (!user || user.password !== password);
};

const validate = async (name, email, password) => {
  const emailAlredyExist = await doesEmailAlreadyExist(email);
  switch (true) {
    case isBlank(name): return erros.invalid_entries;
    case isBlank(email): return erros.invalid_entries;
    case isEmailValid(email): return erros.invalid_entries;
    case isBlank(password): return erros.invalid_entries;
    case emailAlredyExist: return erros.email_exist;
    default: return {};
  }
};

const validateLogin = async (email, password) => {
  const loginNoCorrect = await loginIsCorrect(email, password);
  switch (true) {
    case isBlank(email): return erros.fields_must_be_filled;
    case isEmailValid(email): return erros.Inconrrect_user_password;
    case isBlank(password): return erros.fields_must_be_filled;
    case loginNoCorrect: return erros.Inconrrect_user_password;
    default: return {};
  }
};

module.exports = {
  validate,
  validateLogin,
};
