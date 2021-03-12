const Users = require('../models/Users');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const CONFLICT = 409;

const register = async (request, response, next) => {
  const { name, email, password } = request.body;
  const emailFormatValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
  const emailRegistered = await Users.findByEmail(email);
  
  if (emailRegistered) {
    return response.status(CONFLICT).json({ message: 'Email already registered' });
  }

  if (!name || !email || !password || !emailFormatValid) {
    return response.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
}; 

const login = async (request, response, next) => {
  const { email, password } = request.body;
  const user = await Users.findByEmail(email);

  if (!email || !password) {
    return response.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  
  if (!user || user.password !== password || user.email !== email) {
    return response.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }

  next();
}; 

module.exports = {
  register,
  login,
};