const UsersModel = require('../../models/Users');

const UNAUTHORIZED = 401;
const CONFLICT = 409;
const BAD_REQUEST = 400;
const invalidEntries = {
  payload: { message: 'Invalid entries. Try again.' },
  status: BAD_REQUEST,
};
const emailNotUnique = {
  payload: { message: 'Email already registered' },
  status: CONFLICT,
};
const notFilledFields = {
  payload: { message: 'All fields must be filled' },
  status: UNAUTHORIZED,
};
const wrongLoginInfo = {
  payload: { message: 'Incorrect username or password' },
  status: UNAUTHORIZED,
};

const nameValidation = (name) => {
  if (!name) return invalidEntries;
  return false;
};

const emailRegexTest = (email) => {
  const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return emailRegex.test(email);
};

const emailValidation = async (email) => {
  const emailRegexResult = emailRegexTest(email);
  const getEmail = await UsersModel.getByEmail(email);

  if (!email) return invalidEntries;
  if (!emailRegexResult) return invalidEntries;
  if (getEmail && getEmail.email === email) return emailNotUnique; 
  return false;
};

const passwordValidation = (password) => {
  if (!password) return invalidEntries;
  return false;
};

const loginValidation = async (email, password) => {
  if (!email || !password) return notFilledFields;
  const getEmail = await UsersModel.getByEmail(email);
  if (getEmail === null) return wrongLoginInfo;
  if (getEmail.password !== password) return wrongLoginInfo;

  return false;
};

module.exports = {
  nameValidation,
  emailValidation,
  passwordValidation,
  loginValidation,
  emailRegexTest,
};
