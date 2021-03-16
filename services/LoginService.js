const Users = require('../models/Users');
const Login = require('../models/Login');

const statusError = 401;

const validation = async (obj) => {
  const email = await Users.findUserByEmail(obj.email);
  if (!obj.email || !obj.password) {
    const error = { err: { message: 'All fields must be filled' }, code: statusError };
    return error;
  }
  if (!email || email.password !== obj.password) {
    const error = { err: { message: 'Incorrect username or password' }, code: statusError };
    return error;
  }
};

const verifyUser = async (obj) => {
  const notValid = await validation(obj);
  if (notValid) return notValid;

  const { _id, email, role } = await Users.findUserByEmail(obj.email);

  const answer = await Login.generateToken({ _id, email, role });

  return answer;
};

module.exports = {
  verifyUser,
};