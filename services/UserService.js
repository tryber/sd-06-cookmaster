const Users = require('../models/Users');

const validateEmail = (email) => {
  const regex = /\S+@\S+.\S+/;
  return regex.test(email);
};

const statusError = 400;
const statusRegistered = 409;

const validation = async (obj) => {
  const emailExists = await Users.findUserByEmail(obj.email);
  if (!obj.name || !obj.email || !obj.password || !validateEmail(obj.email)) {
    const error = { err: { message: 'Invalid entries. Try again.' }, code: statusError };
    return error;
  }
  if (emailExists) {
    const error = { err: { message: 'Email already registered' }, code: statusRegistered };
    return error;
  }
};

const createUser = async (obj) => {
  const notValid = await validation(obj);
  if (notValid) return notValid;

  const answer = await Users.createUser(obj);
  return answer;
};

module.exports = {
  createUser,
};